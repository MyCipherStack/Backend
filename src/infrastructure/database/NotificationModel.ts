import mongoose, { Document } from 'mongoose';

export interface INotification extends Document{

    userId:string,

    title:string,

    message:string,

    isRead:boolean,

    link:string,

    createdAt:string
}

const notificaionSchema = new mongoose.Schema<INotification>({

  userId: { type: String, required: true },

  title: { type: String, required: true },

  message: { type: String, required: true },

  link: { type: String },

  isRead: { type: Boolean, default: false },

}, { timestamps: true });

export const notificationModel = mongoose.model<INotification>('notification', notificaionSchema);
