import mongoose from "mongoose";
const OtpSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    otp: { type: String },
    createdAt: { type: Date, default: Date.now, expires: 300 }
});
export const PendingUser = mongoose.model("Otp", OtpSchema);
