import { Request, Response, Router } from "express";
import UserController from "./user.controller";

const userRouter = Router();

const userController = new UserController();


userRouter.post("/signup", (req: Request, res: Response)=>{
    userController.signup(req,res);
})



export default userRouter;