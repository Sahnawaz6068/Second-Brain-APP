import validator from 'validator';
import { Request,Response } from 'express';
import { UserModel } from '../schema/userSchema';
import bcrypt from "bcrypt"
import { error } from 'console';

export const signUpDataValidation = (req:Request) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("firstName or lastName not valid");
  }
   else if (!validator.isEmail(email)) {
    throw new Error("email is valid");
  } 
  else if (!validator.isStrongPassword(password)){
    throw new Error("Password is not valid");
  }
};

