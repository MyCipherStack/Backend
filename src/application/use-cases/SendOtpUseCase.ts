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
            this.pendingUserRepository.updateOtp(email,otp)
            
        }
        console.log("my otp is",otp);
        
        await this.otpService.sendOtp(email,otp)
            

    }
}