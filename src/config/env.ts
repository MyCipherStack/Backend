import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/myapp',
  ACCESS_JWT_TOKEN: process.env.ACCESS_JWT_TOKEN || 'secret_key',
  REFRESH_JWT_TOKEN: process.env.REFRESH_JWT_TOKEN || 'secret_key',
  NODE_ENV: process.env.NODE_ENV || 'development',
  NODEMAILER_PASS: process.env.NODEMAILER_PASS || '',
  EMAIL: process.env.EMAIL || '',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  SESSION_SECRET: process.env.SESSION_SECRET || '',

  RAZORPAY_SECRET: process.env.RAZORPAY_SECRET || 'this_is_my_secret',
  RAZORPAY_KEY: process.env.RAZORPAY_KEY || '',
  GOOGLE_URL: process.env.GOOGLE_URL || 'http://localhost:3000',
  LOKI_TRANSPORT_HOST: process.env.LOKI_TRANSPORT_HOST || 'http://localhost:3100',
  FRONTEND_URL: process.env.FRONTEND_URL,

};
