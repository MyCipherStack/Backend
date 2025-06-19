import mongoose, { Document, model, SchemaTypes, Types } from "mongoose";



export interface ISubscription extends Document{

        userId:Types.ObjectId

        transactionId:Types.ObjectId

        name:string

        price:number

        cycle:string

        features:[{text:String,enabled:Boolean}]

        trial:number

        status:string
}




const subscritpionSchema=new mongoose.Schema<ISubscription>({

    userId:{type:SchemaTypes.ObjectId,ref:"User",required:true},

    transactionId:{type:SchemaTypes.ObjectId,ref:"transaction",required:true},

    name:{ type:String, required:true},

    price:{type:Number,required:true},

    cycle: {  type: String,default:"monthly" },

    features:{type:[{text:String,enabled:Boolean}],default:[]}, 

    trial: { type: Number,default:7 },

    status:{type:String, enum:["active","hidden","deleted"]}



},{timestamps:true})


export const subscripctionModel=mongoose.model<ISubscription>("subscription",subscritpionSchema)