import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository";
import { IOtpService } from "../../domain/services/IOtpService";

export  class VerifyUseCase{

    constructor(
                private pendingUserRepository:IPendingUserRepository,
                 private otpService:IOtpService,
                
    ){}

    async execute(email:string,otp:string){
        const userData=await this.pendingUserRepository.findValidUser(email)
console.log(userData);

  
        
        const isValid=this.otpService.verifyOtp(userData?.otp,otp)
        if(!isValid){
            throw new Error("Invalid OTP");
        }
        return true

    }


}