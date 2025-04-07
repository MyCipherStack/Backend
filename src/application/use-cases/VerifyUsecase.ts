import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository.js";
import { IOtpService } from "../../domain/services/IOtpService.js";

export  class VerifyUseCase{

    constructor(
                private pendingUserRepository:IPendingUserRepository,
                 private otpService:IOtpService,
                
    ){}

    async execute(email:string,otp:string){
        const userData=await this.pendingUserRepository.findValidUser(email)

        if(!userData || !userData.otp){
            throw new Error("OTP has expired or user not found")
        }
  
        
        const isValid=this.otpService.verifyOtp(userData?.otp,otp)
        if(!isValid){
            throw new Error("Invalid OTP");
        }
        return true

    }


}