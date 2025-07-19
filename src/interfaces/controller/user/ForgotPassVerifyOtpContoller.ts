import { OtpDTO } from "@/application/dto/OtpDTO";

import { Request, Response } from "express"
import { IResetPassverifyOtpUseCase } from "@/application/interfaces/use-cases/IUserPasswordUseCases";
import { env } from "@/config/env";

export class ForgotPassVerifyOtpController{
  constructor(
    private resetPassverifyOtpUseCase:IResetPassverifyOtpUseCase
 
) {}
    
  verify = async(req: Request, res: Response) => {
    try {
      const data= new OtpDTO(req.body);
      let success= await this.resetPassverifyOtpUseCase.execute(data)
      if(!success){
        throw new Error("Session expired.Please request OTP again")
      } 
      if(typeof success === 'object')
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