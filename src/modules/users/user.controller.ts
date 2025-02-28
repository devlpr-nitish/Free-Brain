import { Request, Response } from "express";
import { UserModel } from "./user.schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const validateSignup = z.object({
  username: z
    .string()
    .min(3, "username should be at least of length 3")
    .max(10, "username cannot be greater than length 10"),

  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      "password should contains at least an uppercase character and special symbol"
    ),
});

export default class UserController {
  async signup(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      // validate username and password using zod

      const parseData = validateSignup.safeParse({ username, password });

      if (!parseData.success) {
        return res.status(411).json({
          success: false,
          message: parseData.error.issues[0].message,
        });
      }

      const existingUser = await UserModel.findOne({ username });

      if (existingUser) {
        return res.status(411).json({
          success: false,
          message: "user with this username already exists",
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

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


    // check for user existence
    const existingUser = await UserModel.findOne({ username });

    if (!existingUser || !existingUser.password) {
      return res.status(411).json({
        success: false,
        message: "user does not exists",
      });
    }

    // check username and password

    const isMatch = bcrypt.compareSync(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
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
