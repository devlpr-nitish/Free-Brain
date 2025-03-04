import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../users/user.middleware";
import { ContentModel, objectIdSchema, Validatecontent } from "./content.schema";




export default class ContentController{
    async getAll(req:AuthRequest, res:Response, next:NextFunction){
        try {
            const userId = req.userId;

            if(!userId){
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized user",
                });
            }

            const contents = await ContentModel.find({userId});
            return res.status(200).json({
                success: true,
                contents
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Internal server error while fetching contents",
            });
        }
    }

    async addContent(req:AuthRequest, res:Response, next:NextFunction){

        try {
            const {link, title, content,tags, typeId} = req.body;
            const userId = req.userId;

            if(!userId){
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized user",
                });
            }

            const parseData = Validatecontent.safeParse({ title,content, link ,typeId , tags, userId });

            if (!parseData.success) {
                return res.status(200).json({
                success: false,
                message: parseData.error.issues[0].message,
                });
            }


            await ContentModel.create({link, title, userId, content, tags, type: typeId});

            return res.status(201).json({
                success: true,
                message: "content added successfully",
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Internal server error while adding content",
            });
        }
    }


    async findContentByTypeId(req:AuthRequest, res:Response, next:NextFunction){
        try {
            
            const userId = req.userId;
            const {typeId} = req.params;

            if(!userId){
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized user",
                });
            }

            const result = objectIdSchema.safeParse({typeId});
            if (!result.success) {
                return res.status(400).json({ 
                    success: false,
                    message: "Invalid type selected",
                });
            }

            const contents = await ContentModel.find({type: typeId, userId});
            return res.status(200).json({
                success: true,
                contents
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Internal server error while finding content",
            });            
        }
    }

    async deleteContent(req:AuthRequest, res:Response, next:NextFunction){
        try {
            const userId = req.userId;
            const {contentId} = req.params;

            if(!userId){
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized user",
                });
            }

            const result = objectIdSchema.safeParse({contentId});
            if (!result.success) {
                return res.status(400).json({ 
                    success: false,
                    message: "Content doesn't exists",
                });
            }

            const deletedConent = await ContentModel.deleteOne({_id : contentId, userId});
            if(deletedConent.deletedCount == 0){
                return res.status(401).json({
                    success: false,
                    message: "content doesn't exists",
                });
            }
            
            return res.status(201).json({
                success: true,
                message: "content deleted successfully",
            });


        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Internal server error while deleting content",
            }); 
        }
    }
}