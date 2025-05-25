import mongoose from "mongoose";




export interface IInterview{
     position: string,
     interviewType:string,
     date:Date,
     time:string,
     duration: string,
     notes:string,
     hostId:string,
     partipantId:string,
     code:string

}


const interviewSchema=new mongoose.Schema<IInterview>({
    position:{type:String,required:true},
    interviewType:{type:String,required:true},
    date:{type:Date,required:true},
    time:{type:String,required:true},
    duration:{type:String,required:true},
    notes:{type:String,required:true},
    hostId:{type:String,required:true},
    partipantId:{type:String,required:true},
    code:{type:String},
})



export const interviewModel=mongoose.model<IInterview>("inteview",interviewSchema)
