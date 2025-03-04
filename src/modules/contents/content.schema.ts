import { NextFunction, Request, Response } from "express";
import mongoose, { Schema, model } from "mongoose";
import { z } from "zod";
import { AuthRequest } from "../users/user.middleware";

const contentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content:{
    type: String,
    required: true,
  },
  link: [{
    type: String,
  }],
  type: 
    {
      type: mongoose.Types.ObjectId,
      ref: "Type",
      required:true
    },
  
  tags:[
    {
      type:String
    }
  ],
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const ContentModel = model("Content", contentSchema);


export const Validatecontent = z.object({
    title: z.string().min(1, "Title is required").max(20, "Title cannot be greater than 20 lenght"), 
    content: z.string().min(1, "Content is required").max(100000, "Content is too long (max 100,000 characters)"), 
    link: z.array(z.string().url("Please add the valid links")).optional(), 
    typeId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid Type ID",
    }),
    tags: z.array(z.string().min(2, "Please add tag more than 2 length").max(10, "Tag length cannot be greater than 10")).optional(), // Tags should be an array of strings
    userId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid User ID",
    }), 
  });



export const objectIdSchema = z.object({
    typeId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid Type ID",
    }).optional(), 
    contentId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid Content ID",
    }).optional(), 
});
