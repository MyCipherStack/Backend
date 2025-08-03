import mongoose, { Document } from 'mongoose';

export interface IPendingUser extends Document{
    name:string,
    email:string,
    password:string,
    otp?:string,
    createdAt?:Date
}

const OtpSchema = new mongoose.Schema<IPendingUser>({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: String },
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

export const PendingUserModel = mongoose.model<IPendingUser>('Otp', OtpSchema);
