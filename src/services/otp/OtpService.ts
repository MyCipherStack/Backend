import test from "node:test";
import { IOtpService } from "../../domain/services/IOtpService.js";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

export class OtpService implements IOtpService {
  constructor(
    private sender_email: string,
    private email_pass: string
  ) {}

  createOtp(length: number): string {
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
  }


  async sendOtp(
    email: string,
    otp: string
  ): Promise<SMTPTransport.SentMessageInfo> {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.sender_email,
        //    pass: 'xoep evgg bbkm pfsa'
        pass: "gnsv utsa iekh iiki",
      },
    });
    const mailOptions = {
      from: this.sender_email,
      to: email,
      subject: "Your OTP code",
      text: `Your OTP is ${otp}`,
    };

    console.log(this.sender_email, "senderMAil");
    console.log(this.email_pass, "sender pass");

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("EMAIL send successfully", info.response);
      return info;
    } catch (error: any) {
      throw error.response;
    }
  }

  verifyOtp(enterdOtp:string, dbOtp: string): boolean {
    return enterdOtp.trim()===dbOtp.trim()
  } 
}
