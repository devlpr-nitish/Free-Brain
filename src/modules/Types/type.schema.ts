import mongoose,{ model, Schema } from "mongoose";
import { z } from "zod";


const TypeSchema = new Schema({
    typename:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
    
})

const DefaultTypeSchema = new Schema({
    typename:{
        type:String,
        required:true,
        unique: true
    }    
})


export const TypeModel = model('Type', TypeSchema);

export const DefaultTypeModel = model('DefaultType',DefaultTypeSchema);

export const validateType = z.object({
    typename: z.string().min(3, "type name cannot be less than 3 length").max(10, "type name cannot be more than 10 length"),
    userId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid User ID",
    }), 
})