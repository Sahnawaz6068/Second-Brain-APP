import { Router } from "express";
import { Request,Response } from "express";
import bcrypt from "bcrypt"
import { UserModel } from "../schema/userSchema";
import {signUpDataValidation } from "../utils/signUpDataValidation";
const authRouter=Router();


authRouter.post("/signup",async (req:Request,res:Response)=>{
    const {firstName,lastName,email,password}=req.body;
  
    try{
        signUpDataValidation(req);
    }catch(err:any){
        res.status(400).json({
            msg:err.message
        })
    }
    try{
        const bcryptPassword=await bcrypt.hash(password,10);
        const user=await UserModel.create({
            firstName,
            lastName,
            email, 
            password:bcryptPassword
        })
        
        
    res.status(200).json({
        msg:"user created",user})
    }catch(err:any){
        res.status(403).json({
            msg:err.message+"Use alredy exist"
        })
    }
})


    


export default authRouter;

