import mongoose, {Schema, model} from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        require: true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})


export const UserModel = model('User', userSchema);

