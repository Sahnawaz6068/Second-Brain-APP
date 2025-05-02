import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 50
    },
    lastName:{
        type: String,
        trim: true,
        minlength: 4,
        maxlength: 50
    },
    email:{
        type:String,
        unique:true,
        validator:{
            function(value:string){
                return isEmail(value)
                
            }
        }
    },
    password:{
        type:String,
        minlength:8,
        // maxlength:50
    }
});

export const UserModel = mongoose.model("User3", UserSchema);
