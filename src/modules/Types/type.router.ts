
import { NextFunction, Request, Response, Router } from "express";
import TypeController from "./type.controller";
import UserAuth, { AuthRequest } from "../users/user.middleware";

const typeRouter = Router();


const typeController = new TypeController();


typeRouter.post("/", UserAuth, (req:Request,res:Response,next:NextFunction)=>{
    typeController.addType(req as AuthRequest,res,next);
})

typeRouter.get("/",UserAuth, (req:Request,res:Response,next:NextFunction)=>{
    typeController.getAllTypes(req as AuthRequest,res,next);
})


export default typeRouter;