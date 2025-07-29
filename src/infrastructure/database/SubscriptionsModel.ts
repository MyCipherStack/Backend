import { logger } from "@/infrastructure/logger/WinstonLogger/logger";
import mongoose, { Document, SchemaTypes, Types } from "mongoose";



export interface ISubscription extends Document {

    userId: Types.ObjectId

    transactionId: Types.ObjectId

    name: string

    price: number

    cycle: string

    features: [{ text: String, enabled: Boolean }]

    trial: number

    planId: string

    status: string

    endDate: Date,

    createdAt:Date,

    _id: string
}




const SubscriptionSchema = new mongoose.Schema<ISubscription>({

    userId: { type: SchemaTypes.ObjectId, ref: "User", required: true },

    transactionId: { type: SchemaTypes.ObjectId, ref: "transaction", required: true },

    name: { type: String, required: true },

    price: { type: Number, required: true },

    cycle: { type: String, default: "monthly" },

    features: { type: [{ text: String, enabled: Boolean }], default: [] },

    trial: { type: Number, default: 7 },

    planId: { type: String },

    endDate: { type: Date },

    status: { type: String, enum: ["active", "hidden", "deleted"] }




}, { timestamps: true })


SubscriptionSchema.pre("validate", function (next) {

    logger.info("validate",{cycle:this.cycle})

    const today = new Date()
    if (this.cycle === "monthly") {
        this.endDate = new Date(today)
        this.endDate.setMonth(this.endDate.getMonth() + 1)
    }

    if (this.cycle === "quarterly") {
        this.endDate = new Date(today)
        this.endDate.setMonth(this.endDate.getMonth() + 3)
    }
    if (this.cycle === "yearly") {
        this.endDate = new Date(today)
        this.endDate.setFullYear(this.endDate.getFullYear() + 1)
    }


    next()
})


export const subscriptionModel = mongoose.model<ISubscription>("subscription", SubscriptionSchema)