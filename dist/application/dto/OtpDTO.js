export class OtpDTO {
    email;
    otp;
    constructor(data) {
        this.email = data.email;
        if (Array.isArray(data.otp)) {
            this.otp = data.otp.join("");
        }
        else {
            throw new Error("OTP must be an array of strings.");
        }
    }
}
