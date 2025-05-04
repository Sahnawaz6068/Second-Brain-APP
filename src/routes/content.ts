import { Router,Request,Response } from "express";
import userMiddleware from "../middleware/userMiddleware";
import BrainModel from "../schema/brainSchema";


const contentRoute=Router();

contentRoute.post("/content",userMiddleware,async (req:Request,res:Response)=>{
    const link=req.body.link;
    const type=req.body.type;
    console.log(link)
               //@ts-ignore
               const loggedaInUserId=req.UserId;
               console.log(loggedaInUserId)
 
    try{

        const createContent=await BrainModel.create({
            link,
            type,
            userId:loggedaInUserId,
            tags:[]
        })
        res.status(200).json({
            msg:"content is created by userId::"+loggedaInUserId
        })
    }catch(err){
        res.status(403).json({
            msg:"some proble in token"
        })
    }

})
 
contentRoute.get("/content",async (req:Request,res:Response)=>{
    res.send("Content dekho na")
})

contentRoute.delete("/content/:ContentId",async (req:Request,res:Response)=>{
    res.send("delet content")
})

contentRoute.post("/brain/share/",async(req:Request,res:Response)=>{
    res.send("le tu bhi dekh le")
})

contentRoute.get("/brain/share/:conentId",async(req:Request,res:Response)=>{
    res.send("le tu bhi dekh le")
})

export default contentRoute;