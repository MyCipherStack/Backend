
export class OtpDTO{
    email:string
    otp:string
    constructor(data:{email:string,otp:string}){
        this.email=data.email
        if(Array.isArray(data.otp)){
            this.otp=data.otp.join("")
        }else{
            throw new Error("OTP must be an array of strings.");
        }
        }
    }