import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose, { ObjectId } from "mongoose";



export interface AuthRequest extends Request{
    userId : string
}

const UserAuth = (req:Request,res:Response,next:NextFunction):void =>{

    try {
        const token = req.header("Authorization");
        if(!token){
            res.status(401).json({
                success: false,
                message: "Access denied, unauthorized user"
            });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "Secret") as {userId : string}
        
        console.log(decoded);
        const authReq = req as AuthRequest;
        authReq.userId = decoded.userId;

        next();

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid or expired token"
        });
        return;
    }

}

export default UserAuth;