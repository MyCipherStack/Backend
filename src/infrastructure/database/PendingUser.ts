import mongoose from "mongoose"



const OtpSchema=new  mongoose.Schema({
    name:{type:String},
    email:{type:String,required:true},
    password:{type:String},
    otp:{type:String},
    createdAt:{type:Date,default:Date.now,expires:300}
})

export const PendingUser=mongoose.model("Otp",OtpSchema)