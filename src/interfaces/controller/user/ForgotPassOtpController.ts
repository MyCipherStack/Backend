import { Request, Response } from "express";
import { ResetPassswordOtpUseCase } from "@/application/use-cases/ResetPasswordOtpUseCase";
import { IHashAlgorithm } from "@/domain/services/IHashAlgorithm"; 
import { IJwtService } from "@/domain/services/IJwtService"; 
import { IOtpService } from "@/domain/services/IOtpService"; 
import { env } from "@/config/env"; 
import { IPendingUserRepository } from "@/domain/repositories/IPendingUserRepository"; 
import { IUserRepository } from "@/domain/repositories/IUserRepository"; 
import { IResetPassswordOtpUseCase } from "@/application/interfaces/use-cases/IUserPasswordUseCases";



export class ForgotPasswordOtpController{
    constructor(
        private resetPassswordOtpUseCase:IResetPassswordOtpUseCase
        
    ){}
    sendOtp=async(req:Request,res:Response)=>{
        try{
            let data=req.body
            console.log(data.email,"fogotpassword email");
            

    let otpToken=await this.resetPassswordOtpUseCase.execute(data.email)

    console.log(otpToken,"setting toke otp");
    
    
     res.cookie("otpAccess",otpToken,{
                    httpOnly:true,
                    secure:env.NODE_ENV === "production",
                    sameSite:"strict",
                    maxAge:1000 * 60 *5,
                    path:"/"
                })

    res.status(200).json({status:true,message:"otp sented"})
    
}catch(error){
            res.status(400).json({status:true,message:error.message})
            console.log(error);
            
        }
    }
}


