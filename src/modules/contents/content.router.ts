import { Router, NextFunction, Request, Response } from "express";
import ContentController from "./content.controller";
import UserAuth, { AuthRequest } from "../users/user.middleware";


const contentRouter = Router();
const contentController = new ContentController();

contentRouter.get("/",UserAuth , (req:Request,res:Response,next: NextFunction)=>{
    contentController.getAll(req as AuthRequest,res,next);
});

export default contentRouter;