import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm";
import { IJwtService } from "../../domain/services/IJwtService";
import { IOtpService } from "../../domain/services/IOtpService";



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
        let pendingUser= await this.pendingUserRepository.create({name:user.name,email:user.email,password:user.password,otp})
            return {pendingUser}
          } catch (error) {
            console.log(error,"err");
            
            throw new Error(error);
          }

    }
}