import { Request, Response } from "express";
import { UserModel } from "./user.schema";



export default class UserController {
  async signup(req: Request, res: Response) {

    try {
        // validate username and password

        const {username, password} = req.body;

        const existingUser = await UserModel.findOne({username});

        if(existingUser){
            return res.status(411).json({
                success:false,
                message:"user with this username already exists",
            })
        }


        await UserModel.create({
            username, password
        })

        return res.status(201).json({
            success:true,
            message:"Signup successfully",
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:false,
            message:"Internal server error while signup",
        })
    }



  }
}
