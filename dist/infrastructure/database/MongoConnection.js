import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected .....");
    }
    catch (error) {
        console.error("mongoDB connection failed", error);
        process.exit(1);
    }
};
