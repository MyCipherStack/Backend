
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index';
import { IOtpService } from '@/domain/services/IOtpService'; 



export class OtpService implements IOtpService {
  constructor(
    private sender_email: string,
    private email_pass: string,
  ) { }

  createOtp(length: number): string {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
  }

  async sendOtp(
    email: string,
    otp: string,
  ): Promise<SMTPTransport.SentMessageInfo> {



    console.log("node paasss",{email:this.sender_email,pass:this.email_pass})
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.sender_email,
        pass: this.email_pass,
      },
    });

    const mailOptions = {
      from: `"CipherStack Support" <${this.sender_email}>`,
      to: email,
      subject: 'Verify Your Email Address – OTP Inside',
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; max-width: 500px; margin: auto;">
      <h2 style="color: #222; text-align: center;">Email Verification – CipherStack</h2>
      <p>Hello,</p>
      <p>To complete your sign-up, please use the OTP below:</p>

      <div style="font-size: 28px; font-weight: bold; background: #f8f8f8; padding: 12px 0; text-align: center; border-radius: 6px; letter-spacing: 2px;">
        ${otp}
      </div>

      <p style="margin-top: 20px;">This OTP is valid for 5 minutes. Please do not share it with anyone.</p>

      <div style="text-align: center; margin: 20px 0;">
        <a href="#" style="background-color: #4a90e2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Verify Now
        </a>
      </div>

      <p>If you did not request this email, you can safely ignore it.</p>

      <hr style="margin-top: 30px;" />
      <p style="font-size: 12px; color: #888;">Need help? Contact support@cipherstack.com</p>
      <p style="font-size: 12px; color: #aaa;">© 2025 CipherStack. All rights reserved.</p>
    </div>
  `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('EMAIL send successfully', info.response);
      return info;
    } catch (error: any) {
      throw error;
    }
  }

  verifyOtp(enterdOtp: string, dbOtp: string): boolean {
    return enterdOtp.trim() === dbOtp.trim();
  }
}
