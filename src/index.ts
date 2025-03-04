import dotenv from "dotenv";
dotenv.config();
import express from "express";
import jsonwebtoken from "jsonwebtoken";
import userRouter from "./modules/users/user.router";
import { connectToDB } from "./config/db";
import contentRouter from "./modules/contents/content.router";
import UserAuth from "./modules/users/user.middleware";
import cors from "cors";
import typeRouter from "./modules/Types/type.router";


const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/contents", contentRouter);
app.use("/api/v1/types", typeRouter);

app.get("/", (req,res)=>{
    res.send("Hello, Free Your Brain");
})


app.listen(3000, ()=>{
    console.log(`Sever is running`);   
    connectToDB(); 
})