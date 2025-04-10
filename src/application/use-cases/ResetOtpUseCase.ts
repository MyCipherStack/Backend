import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm.js";
import { IJwtService } from "../../domain/services/IJwtService.js";
import { IOtpService } from "../../domain/services/IOtpService.js";
import { JwtService } from "../../services/jwt/JwtService.js";


export class ResetOtpUseCase{
    constructor(
        private otpService:IOtpService,
        private jwtService:IJwtService
        private hash:IHashAlgorithm
    ){}

    async execute(email:string){

        let otp=this.otpService.createOtp(6)
    

        console.log("my otp is",otp);

        try {
            await this.otpService.sendOtp(email, otp);

            this.jwtService.signAccessToken()

          } catch (error) {
            console.log(error,"err");
            
            throw new Error("Failed to send OTP");
          }

    }
}