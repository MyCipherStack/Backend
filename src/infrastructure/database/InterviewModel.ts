import mongoose from "mongoose";
import { Document } from "mongoose";




export interface IInterview extends Document{
     position: string,
     interviewType:string,
     date:Date,
     time:string,
     duration: string,
     notes:string,
     hostId:string,
     partipantId:string,
     code?:string,
     status?:string
}


const interviewSchema=new mongoose.Schema<IInterview>({
    position:{type:String,required:true},
    interviewType:{type:String,required:true},
    date:{type:Date,required:true},
    time:{type:String,required:true},
    duration:{type:String,required:true},
    notes:{type:String,required:true},
    hostId:{type:String,required:true},
    partipantId:{type:String},
    code:{type:String},
    status:{type:Boolean,default:true}
},{timestamps:true})



export const interviewModel=mongoose.model<IInterview>("inteview",interviewSchema)



