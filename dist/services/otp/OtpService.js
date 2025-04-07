import nodemailer from "nodemailer";
export class OtpService {
    sender_email;
    email_pass;
    constructor(sender_email, email_pass) {
        this.sender_email = sender_email;
        this.email_pass = email_pass;
    }
    createOtp(length) {
        let otp = "";
        for (let i = 0; i < length; i++) {
            otp += Math.floor(Math.random() * 10).toString();
        }
        return otp;
    }
    async sendOtp(email, otp) {
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
        }
        catch (error) {
            throw error.response;
        }
    }
    verifyOtp(enterdOtp, dbOtp) {
        return enterdOtp.trim() === dbOtp.trim();
    }
}
