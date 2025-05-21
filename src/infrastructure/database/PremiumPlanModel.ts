import mongoose from "mongoose";
import { Schema } from "mongoose";





export interface IPlanDocument extends Document {
    name: string;
    price: number;
    cycle: string;
    features: string[];
    trial: number;
    status: boolean;
  }


const PremiumPlanSchema=new Schema<IPlanDocument>({

    name:{ type:String, required:true},

    price:{type:Number,required:true},

    cycle: {  type: String,required: true },

    features: { type: [String], required: true },

    trial: { type: Number, required: true },

    status:{type:Boolean,default:true}
    
},{timestamps:true}

)

export const premiumPlanModel=mongoose.model<IPlanDocument>("premiumPlan",PremiumPlanSchema)