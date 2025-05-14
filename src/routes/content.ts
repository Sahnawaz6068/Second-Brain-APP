import { Router, Request, Response } from "express";
import userMiddleware from "../middleware/userMiddleware";
import BrainModel from "../schema/brainSchema";
import LinkModel from "../schema/linkSchema";
import { ShareHashGenerator } from "../utils/hashShare";
import { UserModel } from "../schema/userSchema";

const contentRoute = Router();
//store/post data in brain
contentRoute.post(
  "/content",
 
  async (req: Request, res: Response) => {
    const link = req.body.link;
    const type = req.body.type; 
    const title=req.body.title;
    console.log(link);
    //@ts-ignore
    // const loggedaInUserId = req.UserId;
    // console.log(loggedaInUserId);

    try {
      const createContent = await BrainModel.create({
        title,
        link,
        type,
        // userId: loggedaInUserId,
        tags: [],
      });
      res.status(200).json({
        msg: "content is created by userId::" ,
      });
    } catch (err) {
      res.status(403).json({
        msg: "some proble in token" + err,
      });
    }
  }
);
//get the all content using you loggedin user id,access only if you are logg
contentRoute.get(
  "/content",
  userMiddleware,
  async (req: Request, res: Response) => {
    //@ts-ignore
    const loggedaInUserId = req.UserId;
    try {
      const content = await BrainModel.find({
        userId: loggedaInUserId,
      }).populate("userId", "firstName email");
      console.log(content);
      res.send(content);
    } catch (err) {
      res.status(400).send("Erroin logged in" + err);
    }
    res.send("Content dekho na");
  }
);
//delete content using contentId and loggedin userId
contentRoute.delete(
  "/content/:ContentId",
  userMiddleware,
  async (req: Request, res: Response) => {
    const Id = req.params.ContentId;
    //@ts-ignore
    const loggedaInUserId = req.UserId;
    console.log(Id);
    try {
      const response = await BrainModel.deleteMany({
        _id: Id,
        userId: loggedaInUserId,
      });
      console.log(response);
      res.send("cONTENT deleted from Brain");
    } 
    catch (err) {
      res.send(
        "Error  in deleting content may be you are not authorized to do it"
      );
    }
  }
);

//shere content
// contentRoute.post("/brain/share/:contentId",userMiddleware, async (req: Request, res: Response) => {
//   const contentId=req.params.contentId;
//   //@ts-ignore
//   const loggedInUserId = req.UserId;
//   //Share all the brain not specific make it specific share brain 
//   //Usiing the haAH ID WE can access the Content 
//   try{
//     const hash=uuidv4();
//     console.log(hash)
//     const newLink=await LinkModel.create({
//       hash,
//       contentId,
//       userId:loggedInUserId,
//     })
//     console.log(newLink)
//     // const response=await newLink.save();

//     res.status(200).json({
//       msg:newLink,
//       shareableLink:"http://localhost:3000/api/v1"+ `/brain/access/${hash}`
//     })
//   }catch(err){
//     res.status(404).send(err);
//   }
// });

//share brain

contentRoute.post("/brain/share",userMiddleware,async (req:Request,res:Response)=>{
  const {share}=req.body;
  //@ts-ignore
  const loggedInUserId=req.UserId;
  console.log(loggedInUserId);
  // console.log(ShareHashGenerator(10));
  try{
    //If it exist mean This loggedIn user already made sharable link
    
    if(share){
      const existingLink=await LinkModel.find({
        userId:loggedInUserId
      })
      console.log(existingLink[0]);
      //if you got existing link then do this
      if(existingLink[0]){
          res.status(200).json({
          msg:existingLink[0].hash
        })
      }
      //if you do not got existing link then create
      const link=await LinkModel.create({
        hash:ShareHashGenerator(10),
        userId:loggedInUserId,
        //our hash generator 
      })
      console.log("Link is generated")
      // const hashLink=link.hash;
      res.status(200).json({
        msg:"Hash link is generated:::->"+link.hash,
        
      })
      //if share true nahi hai to link ko delete kar so
    }else{
      await LinkModel.deleteOne({
        userId:loggedInUserId
      })
      res.status(200).json({
        msg:"Sharable link is removed"
      })
    }
  }catch(error){ 
    res.status(400).json({
      msg:"Brain can not be share "+error
    })
  }  
})
//get brain end point 
//it is open end point anyone can get w/o authentication and authorization
contentRoute.get("/brain/:shareLink",async (req:Request,res:Response)=>{
  const shareLink=req.params.shareLink;
  console.log(shareLink)
  try{
    const brainLink=await LinkModel.findOne({
      hash:shareLink
    })
    console.log(brainLink);
    if(!brainLink){
      throw new Error("Something wrong with hash");
      return;
    }
    /*how it work->in sharable link search throuh hash then from there find userId then find all the content 
    from content model or Brain Store Model then search in userModel*/
    const content =await BrainModel.find({
      userId:brainLink.userId
    })
    const userInfo=await UserModel.find({
       _id:brainLink.userId
    })
    console.log(content);
    if(!userInfo){
      res.send("Error should not happen  something wrong in logic");
      return;
    }
  //  const fn=userInfo.firstName
  console.log("_________________________________________________________________________________")
    console.log(userInfo[0].firstName);
    console.log(userInfo);
    res.status(200).json({
      msg:content
    })
  }catch(err:any){
    res.status(400).json({
      msg:"Sorry incorrect input"+err.message
    })
  }
})

export default contentRoute;

//38:00 start Front end