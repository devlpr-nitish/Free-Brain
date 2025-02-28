import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../users/user.middleware";


export default class ContentController{
    async getAll(req:AuthRequest, res:Response, next:NextFunction){
        return res.json({hey:"Hello"});
    }

    async addContent(req:AuthRequest, res:Response, next:NextFunction){

        try {
            const {link, title} = req.body;
            
        } catch (error) {
            
        }
    }
}