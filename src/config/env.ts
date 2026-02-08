import dotenv from 'dotenv';
import path from 'path';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;

// Load the env file from the project root
dotenv.config({ path: path.resolve(process.cwd(), envFile) });



export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/myapp',
  ACCESS_JWT_TOKEN: process.env.ACCESS_JWT_TOKEN || 'secret_key',
  REFRESH_JWT_TOKEN: process.env.REFRESH_JWT_TOKEN || 'secret_key',
  NODE_ENV: process.env.NODE_ENV || 'development',
  NODEMAILER_PASS: process.env.NODEMAILER_PASS,
  EMAIL: process.env.EMAIL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  SESSION_SECRET: process.env.SESSION_SECRET || '',
  RAZORPAY_SECRET: process.env.RAZORPAY_SECRET || 'this_is_my_secret',
  RAZORPAY_KEY: process.env.RAZORPAY_KEY || '',
  GOOGLE_URL: process.env.GOOGLE_URL,
  LOKI_TRANSPORT_HOST: process.env.LOKI_TRANSPORT_HOST || 'http://localhost:3100',
  FRONTEND_URL: process.env.FRONTEND_URL,
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
  JUDGE0_API_URL: process.env.JUDGE0_API_URL,
  REDIS_URL: process.env.REDIS_URL,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  REDIS_HOST: process.env.REDIS_HOST || 'redis',
  REDIS_PORT: process.env.REDIS_PORT  ||  6379,
};
