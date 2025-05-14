
import { NextFunction,Request,Response } from "express"
import jwt from "jsonwebtoken"
const Cookies =require("cookies")
 const userMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    //@ts-ignore
    const cookies = new Cookies(req, res);
    const token = cookies.get("token");
    console.log(token);
    if(!token){
        res.send("token is not present or user is not logined")
    }
    try{
        const tokenVarify=jwt.verify(token,"Sahnawaz!@123")
        if(tokenVarify){
            //@ts-ignore
            req.UserId=tokenVarify.id
            next();
        }
    }catch(err){
        res.status(400).send("user have wrong credentials")
    }
}

export default userMiddleware;