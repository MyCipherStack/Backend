import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/myapp",
  ACCESS_JWT_TOKEN: process.env.ACCESS_JWT_TOKEN || "your_secret_key",
  REFRESH_JWT_TOKEN: process.env.REFRESH_JWT_TOKEN || "your_secret_key",
  NODE_ENV:process.env.NODE_ENV || "development",
  NODEMAILER_PASS:process.env.NODEMAILER_PASS || "",
  EMAIL:process.env.EMAIL || ""
};
//hsdkhkashdf
