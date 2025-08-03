import mongoose, { Document, SchemaTypes, Types } from 'mongoose';

export interface ITransaction extends Document{
    userId:Types.ObjectId,
    amount:number,
    paymentMethord:string,
    paymentId:string,
    orderId:string,
    status:string

}

const paymentSchema = new mongoose.Schema<ITransaction>({

  userId: { type: SchemaTypes.ObjectId, ref: 'User', required: true },

  amount: { type: Number, required: true },

  paymentMethord: { type: String, required: true },

  orderId: { type: String, required: true },

  paymentId: { type: String, required: true },

  status: { type: String, enum: ['pending', 'success', 'failed'], required: true },

}, { timestamps: true });

export const transactionModel = mongoose.model<ITransaction>('transaction', paymentSchema);
