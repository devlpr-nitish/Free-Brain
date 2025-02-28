import { Request, Response, Router } from "express";
import UserController from "./user.controller";

const userRouter = Router();

const userController = new UserController();


userRouter.post("/signup", (req: Request, res: Response)=>{
    userController.signup(req,res);
})

userRouter.post("/signin", (req: Request, res: Response)=>{
    userController.signin(req,res);
})



export default userRouter;