import { Router, Request, Response } from "express";
import userMiddleware from "../middleware/userMiddleware";
import BrainModel from "../schema/brainSchema";
import {v4 as uuidv4} from "uuid"
import LinkModel from "../schema/linkSchema";
const contentRoute = Router();

//store/post data in brain
contentRoute.post(
  "/content",
  userMiddleware,
  async (req: Request, res: Response) => {
    const link = req.body.link;
    const type = req.body.type;
    console.log(link);
    //@ts-ignore
    const loggedaInUserId = req.UserId;
    console.log(loggedaInUserId);

    try {
      const createContent = await BrainModel.create({
        link,
        type,
        userId: loggedaInUserId,
        tags: [],
      });
      res.status(200).json({
        msg: "content is created by userId::" + loggedaInUserId,
      });
    } catch (err) {
      res.status(403).json({
        msg: "some proble in token" + err,
      });
    }
  }
);
//get the all content using you loggedin user id
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
contentRoute.post("/brain/share/:contentId",userMiddleware, async (req: Request, res: Response) => {
  const contentId=req.params.conentId;
  //@ts-ignore
  const loggedaInUserId=req.UserId;
  //Share all the brain not specific make it specific share brain 
  //Usiing the haAH ID WE can access the Content 
  try{
    const hash=uuidv4();
    const newLink=new LinkModel({
      hash,
      userId:loggedaInUserId
    })
    await newLink.save();
    res.send("Link is created")
  }catch(err){
    res.status(404).send(err);
  }
  res.send("le tu bhi dekh le");
});

//share brain
contentRoute.post("/brain/share",userMiddleware,(req:Request,res:Response)=>{
  //@ts-ignore
  const loggedaInUserId=req.UserId;
  try{
    console.log("share your brain");
    res.status(200).json({
      msg:"brain shaired"
    })
  }catch(err:any){
    res.status(404).json({
      msg:"brain can not share"
    })
  }
})

contentRoute.get(
  "/brain/share/:conentId",
  async (req: Request, res: Response) => {
    res.send("le tu bhi dekh le");
  }
);

export default contentRoute;
