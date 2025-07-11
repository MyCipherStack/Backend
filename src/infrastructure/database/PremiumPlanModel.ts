import mongoose from "mongoose";
import { Document } from "mongoose";
import { Schema } from "mongoose";





export interface IPlanDocument extends Document {
    name: string;
    price: number;
    cycle: string;
    features: {text:String,enabled:Boolean}[];
    trial: number;
    status:string;
  }


const PremiumPlanSchema=new Schema<IPlanDocument>({

    name:{ type:String, required:true,unique:true},

    price:{type:Number,required:true},

    cycle: {  type: String,default:"monthly" },

    // features: { type: [String], required: true },
    features:{type:[{text:String,enabled:Boolean}],default:[]}, 

    trial: { type: Number,default:7 },

    status:{type:String, enum:["active","hidden","deleted"]}
    
},{timestamps:true}

)

export const premiumPlanModel=mongoose.model<IPlanDocument>("premiumPlan",PremiumPlanSchema)