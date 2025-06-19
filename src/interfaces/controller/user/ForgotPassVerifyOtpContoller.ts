import { OtpDTO } from "@/application/dto/OtpDTO";

import { Request, Response } from "express"
import { IPendingUserRepository } from "@/domain/repositories/IPendingUserRepository";
import { IHashAlgorithm } from "@/domain/services/IHashAlgorithm"; 
import { ResetPassverifyOtpUseCase } from "@/application/use-cases/ResetPassverifyOtpUseCase"; 
import { env } from "process";

export class ForgotPassVerifyOtpController{
  constructor(
    private pendingUserRepository:IPendingUserRepository,
    private hashService:IHashAlgorithm,
 
) {}
    
  verify = async(req: Request, res: Response) => {
    try {
      const data= new OtpDTO(req.body);
      const resetUseCase=new  ResetPassverifyOtpUseCase(this.pendingUserRepository,this.hashService)
      let success= await resetUseCase.execute(data)
      if(!success){
        throw new Error("Session expired.Please request OTP again")
      } 
      res.cookie("otpAccess",{email:success.email,verifyed:success.verified},{
                         httpOnly:true,
                         secure:env.NODE_ENV === "production",
                         sameSite:"strict",
                         maxAge:1000 * 60 *5,
                         path:"/"
                     }) 
      res.json({status:true,message:"otp  verified"})
      
    } catch (error:any) {
      console.log(error);
      
      return res.status(400).json({ status: false, message:error.message}); 
    }
  };
}