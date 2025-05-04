console.log("Building Second Brain with TypeScript")

import express from "express";
import {connectionDB} from "./db"
import authRouter from "./routes/auth"
import loginRoute from "./routes/login";
import contentRoute from "./routes/content";

const app=express();

app.use(express.json());
app.use("/api/v1",authRouter);
app.use("/api/v1",loginRoute);
app.use("/api/v1",contentRoute);

async function startApp(){
    try{
        await connectionDB();
        console.log("db is connected")
        app.listen(3000,()=>{
            console.log("App is listening on port 3000")
        });
    }catch(err){
        console.error(err)

        console.log("something wrong happen")
    }
    
} 

startApp();
