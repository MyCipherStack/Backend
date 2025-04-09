import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository.js";
import { IOtpService } from "../../domain/services/IOtpService.js";


export class SendOtpUseCase{

    constructor(
        private otpService:IOtpService,
        private pendingUserRepository:IPendingUserRepository
    ){}
    async execute(email:string){
        const foundUser=await this.pendingUserRepository.findValidUser(email)
        let otp=""
        if(foundUser?.otp){
            console.log("user found");
            otp=foundUser?.otp ?? "" 
        }else{
            otp=this.otpService.createOtp(6)
            const User=await this.pendingUserRepository.save("",email,"",otp)
            // this.pendingUserRepository.updateOtp(email,otp)
            
        }
        console.log("my otp is",otp);
        console.log(" user email",email);
    
        try {
            await this.otpService.sendOtp(email, otp);
          } catch (error) {
            console.log(error,"err");
            
            throw new Error("Failed to send OTP");
          }

    }
}