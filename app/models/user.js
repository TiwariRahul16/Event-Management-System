import mongoose from "mongoose";
import { Schema,model } from "mongoose";

const UserSchema = new Schema({
    email:{type:String, required:true},
    password: { type: String },
    name:{type:String},
    Sex:{type:String},
    username:{type:String},
    profilepic:{type:String},
    coverpic:{type:String},
    razorpayId:{type:String},
    razorpaySecret:{type:String},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now}

});

export default mongoose.models.User ||  model("User",UserSchema);