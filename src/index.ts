import express from "express";
import jsonwebtoken from "jsonwebtoken";
import userRouter from "./modules/users/user.router";
import { connectToDB } from "./config/db";

const app = express();
app.use(express.json());

app.use("/api/v1/user",userRouter);

app.get("/", (req,res)=>{
    res.send("Hello, Free Your Brain");
})


app.listen(3000, ()=>{
    console.log(`Sever is running`);   
    connectToDB(); 
})