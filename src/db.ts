import mongoose from "mongoose";

export const connectionDB= async ()=>{
    try{
        await mongoose.connect(
            "mongodb+srv://nevergiveup6162:pTdkCxtQ4zCinCj1@cluster0.skhui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/SecondBrain"
        );
    }catch(err){
        console.log("lol")
        console.error(err)
    }
}

