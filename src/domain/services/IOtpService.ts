import { promises } from "dns";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";


export interface IOtpService{
    createOtp(length:number):string;
    sendOtp(email:string,otp:string):Promise<SMTPTransport.SentMessageInfo>;
    verifyOtp(enterdOtp:string,dbOtp:string):boolean
}