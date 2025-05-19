import mongoose from "mongoose";
import { Schema } from "mongoose";





interface IPlan {
    name: string;
    price: number;
    cycle: string;
    features: string[];
    trial: number;
    status: string;
  }


const PremiumPlanSchema=new Schema({

    name:{ type:String, required:true},

    price:{type:Number,required:true},

    cycle: {  type: String,required: true },

    features: { type: [String], required: true },

    trial: { type: Number, required: true },

    status:{type:String,default:true}
    
},{timestamps:true}

)

export const premiumPlanModel=mongoose.model<IPlan>("premiumPlan",PremiumPlanSchema)