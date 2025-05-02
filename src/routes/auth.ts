import express,{ Router } from "express";
import { Request,Response } from "express";
import bcrypt from "bcrypt"
import { UserModel } from "../schema/userSchema";
import { signUpDataValidation } from "../utils/signUpDataValidation";
const authRouter=Router();
const app=express();
app.use(express.json());

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
        res.status(400).json({
            msg:err.message
        })
    }
})

authRouter.post("/login",async (req:Request,res:Response)=>{
    const {email,password}=req.body;
        try{ 
            const User=await UserModel.findOne({email:email})
            const firstName=User?.firstName;
            console.log(firstName)
            
    if (!User || !User.password) {
         res.status(404).json({ msg: "User not found or password missing" });
      }
            const decryptPassword=await bcrypt.compare(password, User.password);
            console.log(decryptPassword)
            res.send("lalaalallalaal")
        }catch(err:any){
            res.status(400).json({
                msg:err.message
            })
        }
})

export default authRouter;

