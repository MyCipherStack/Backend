import mongoose, { Document } from "mongoose";



export interface INotification extends Document{

    userId:string,

    type:string,

    message:string,

    isRead:boolean,

    createdAt:string
}


const notificaionSchema=new mongoose.Schema<INotification>({

    userId:{type:String,required:true},

    type:{type:String,required:true},

    message:{type:String,required:true},

    isRead:{type:Boolean,default:false},

},{timestamps:true})



const notificaionModel=mongoose.model<INotification>("notification",notificaionSchema)