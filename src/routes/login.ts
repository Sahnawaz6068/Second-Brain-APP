import { Router } from "express";
import { Request, Response } from "express";
import { UserModel } from "../schema/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginRoute = Router();
//@ts-ignore
loginRoute.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    const hashPassword = user?.password;
    const Id = user?._id;

    if (!hashPassword || !user) {
      return res.status(403).send("user or password is not valid or found");
    }

    //first we have check here that hashPassword is present or not then we check password is correct or not
    const isCorrectPassword = await bcrypt.compare(password, hashPassword);
    if (!isCorrectPassword) {
      return res.status(403).send("user or password is not valid or found");
    }
    console.log(isCorrectPassword);
    if (isCorrectPassword) {
      const token = await jwt.sign(
        {
          id: Id,
        },
        "Sahnawaz!@123"
      );
      console.log(token);
      //@ts-ignore
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, 
        //sameSite: "Lax", 
      });

      res.status(200).json({
        token: token,
      });
    }
    // const isPasswordValid = await bcrypt.compare(password, user.password);
  } catch (err: any) {
    res.status(403).json({
      msg: "Loggen in input data is not valid" + err,
    });
  }
});

export default loginRoute;
