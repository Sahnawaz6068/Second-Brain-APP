import mongoose, { Model } from "mongoose";

const linkSchema=new mongoose.Schema({
    hash: {type:String,required:true},
    // contentId:{
    //     type:String,required:true
    // },
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User3',required:true,
        unique:true
    },
})

const LinkModel=mongoose.model("Link",linkSchema)
export default LinkModel;