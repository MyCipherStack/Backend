import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm.js";
import { IJwtService } from "../../domain/services/IJwtService.js";
import { IOtpService } from "../../domain/services/IOtpService.js";



export class ResetPassswordOtpUseCase{
    constructor(
        private otpService:IOtpService,
        private jwtService:IJwtService,
        private hashService:IHashAlgorithm,
          private pendingUserRepository:IPendingUserRepository,
          private userRepository:IUserRepository,

          
      
    ){}

    async execute(email:string){

        try {
        let user= await this.userRepository.findByEmail(email)
        if(!user){
          throw new Error("user not found ")
        }

        let otp=this.otpService.createOtp(6)

        console.log("my otp is",otp,email);

            await this.otpService.sendOtp(email, otp);

      //  let hashedOtp = await this.hashService.hash(otp)
        let pendingUser= await this.pendingUserRepository.save(user.name,user.email,user.password,otp,)
            return {pendingUser}
          } catch (error) {
            console.log(error,"err");
            
            throw new Error(error);
          }

    }
}