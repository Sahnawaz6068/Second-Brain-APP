
import mongoose from "mongoose";


const BrainSchema=new mongoose.Schema({
        type:{
            type:String,
            required:true
        },
        link:{
            type:String,
            required:true,
            unique:true
        },
        title:{
            type:String
        },
        tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
        userId:[{type:mongoose.Types.ObjectId,ref:'User3',require:true}],
})

const BrainModel=mongoose.model("Brain",BrainSchema);

export default BrainModel;

// module.exports={
//     BrainModel
// }