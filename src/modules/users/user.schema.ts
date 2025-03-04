import mongoose, {Schema, model} from "mongoose";
import { z } from "zod";

const userSchema = new Schema({
    username:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})


export const UserModel = model('User', userSchema);



export const validateUser = z.object({
  username: z
    .string()
    .min(3, "username should be at least of length 3")
    .max(20, "username cannot be greater than length 20"),

  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      "password should contains at least an uppercase character and special symbol"
    ),
});