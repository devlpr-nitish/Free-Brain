import { Request, Response } from "express";
import { UserModel, validateUser } from "./user.schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class UserController {
  async signup(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      // validate username and password using zod

      const parseData = validateUser.safeParse({ username, password });

      if (!parseData.success) {
        return res.status(200).json({
          success: false,
          message: parseData.error.issues[0].message,
        });
      }

      const existingUser = await UserModel.findOne({ username });

      if (existingUser) {
        return res.status(200).json({
          success: false,
          message: "user with this username already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await UserModel.create({
        username,
        password: hashedPassword,
      });

      return res.status(201).json({
        success: true,
        message: "Signup successfully",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Internal server error while signup",
      });
    }
  }


  async signin(req: Request, res: Response) {
    try {
      
      const { username, password } = req.body;

      const parseData = validateUser.safeParse({ username, password });

      if (!parseData.success) {
        return res.status(200).json({
          success: false,
          message: parseData.error.issues[0].message,
        });
      }
      
    // check for user existence
    const existingUser = await UserModel.findOne({ username });
    
    
    if (!existingUser || !existingUser.password) {
      return res.status(200).json({
        success: false,
        message: "user does not exists",
      });
    }
    
    // check username and password
    
    const isMatch = await bcrypt.compare(password, existingUser.password);
    
    if (!isMatch) {
      return res.status(200).json({
        success: false,
        message: "Incorrect credentials",
      });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET!,
      {
        expiresIn: "2d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });

    
    } catch (error) {
        console.log(error);

      return res.status(500).json({
        success: false,
        message: "Internal server error while signin",
      });
    }
  }
}
