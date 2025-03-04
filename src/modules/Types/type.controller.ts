import { NextFunction, Response } from "express";
import { AuthRequest } from "../users/user.middleware";
import { DefaultTypeModel, TypeModel, validateType } from "./type.schema";

export default class TypeController {
  async addType(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized user",
        });
      }

      const { typename } = req.body;

      const parseData = validateType.safeParse({ typename, userId });
      if (!parseData.success) {
        return res.status(200).json({
          success: false,
          message: parseData.error.issues[0].message,
        });
      }

      await TypeModel.create({ typename, userId });

      return res.status(201).json({
        success: true,
        message: "Type created successfully",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Internal server error while creating type",
      });
    }
  }

  async getAllTypes(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.userId;
        if (!userId) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized user",
          });
        }
  
        
        const types = await TypeModel.find({userId});
        const defaulttypes = await DefaultTypeModel.find();
  
        return res.status(201).json({
          success: true,
            //   message: "Type created successfully",
            types,
            defaulttypes
        });
      } catch (error) {
        console.log(error);
  
        return res.status(500).json({
          success: false,
          message: "Internal server error while fetching types",
        });
      }
  }
}
