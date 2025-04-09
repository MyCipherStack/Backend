import { OtpDTO } from "../../application/dto/OtpDTO.js";

import { Request, Response } from "express"
import { VerifyUseCase } from "../../application/use-cases/VerifyUsecase.js";
import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository.js";
import { IOtpService } from "../../domain/services/IOtpService.js";
import { env } from "../../config/env.js";

export class forgotPaswordVerifyOtp{
  constructor(
    private otpService: IOtpService,
    private PendingUserRepository: IPendingUserRepository,

) {}
    
  verify = async(req: Request, res: Response) => {
    try {
      console.log("verigy otp");
      const data= new OtpDTO(req.body);
      console.log(data)
      const verifyUsecase = new VerifyUseCase(this.PendingUserRepository,this.otpService);
      const isValid=await verifyUsecase.execute(data.email,data.otp)

      if (!isValid) {
        console.log("not valid otp");
        
          return res.status(400).json({ status: false, message: "Invalid or expired OTP" });
        }
      
     
 res.cookie("otpAccess",data.email,{
                httpOnly:true,
                secure:env.NODE_ENV === "production",
                sameSite:"strict",
                maxAge:1000 * 60 * 60 * 24 * 7,
                path:"/"
            })
      res.json({status:true,message:"otp  verified"})
    } catch (error:any) {
        console.log(error);
        return res.status(500).json({ status: false, message:error.message });
    }
  };


}