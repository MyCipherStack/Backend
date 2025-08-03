import mongoose from 'mongoose';
import { env } from '@/config/env';

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI as string);
    console.log('mongodb connected .....');
  } catch (error) {
    console.error('mongoDB connection failed', error);
    process.exit(1);
  }
};
