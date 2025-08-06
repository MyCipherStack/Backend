import SMTPTransport from "nodemailer/lib/smtp-transport";


export interface IOtpService{
    createOtp(length:number):string;
    sendOtp(email:string, otp:string):Promise<SMTPTransport.SentMessageInfo>;
    verifyOtp(enterdOtp:string, dbOtp:string):boolean
}
