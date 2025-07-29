import { Request, Response } from "express";
import { env } from "@/config/env"; 
import { IResetPasswordOtpUseCase } from "@/application/interfaces/use-cases/IUserPasswordUseCases";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";



export class ForgotPasswordOtpController{
    constructor(
        private resetPassswordOtpUseCase:IResetPasswordOtpUseCase
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
            res.status(HttpStatusCode.BAD_REQUEST).json({status:true,message:error.message})
            console.log(error);
            
        }
    }
}


