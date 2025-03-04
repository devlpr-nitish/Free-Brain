import { Router, NextFunction, Request, Response } from "express";
import ContentController from "./content.controller";
import UserAuth, { AuthRequest } from "../users/user.middleware";


const contentRouter = Router();
const contentController = new ContentController();

contentRouter.get("/:typeId",UserAuth , (req:Request,res:Response,next: NextFunction)=>{
    contentController.findContentByTypeId(req as AuthRequest,res,next);
});
contentRouter.delete("/:contentId",UserAuth , (req:Request,res:Response,next: NextFunction)=>{
    contentController.deleteContent(req as AuthRequest,res,next);
});
contentRouter.get("/",UserAuth , (req:Request,res:Response,next: NextFunction)=>{
    contentController.getAll(req as AuthRequest,res,next);
});
contentRouter.post("/",UserAuth , (req:Request,res:Response,next: NextFunction)=>{
    contentController.addContent(req as AuthRequest,res,next);
});

export default contentRouter;