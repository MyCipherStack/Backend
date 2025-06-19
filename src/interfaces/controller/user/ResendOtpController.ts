import { Request, Response } from "express";
import { IOtpService } from "@/domain/services/IOtpService"; 
import { SendOtpUseCase } from "@/application/use-cases/SendOtpUseCase";
import { IPendingUserRepository } from "@/domain/repositories/IPendingUserRepository"; 


export class ResendOtpController{
    constructor(
        private otpService: IOtpService,
        private PendingUserRepository:IPendingUserRepository
                
        

    ){

    }

    resend=async(req:Request,res:Response)=>{
        try{
            console.log("resend in backend");
            
            // const data= new OtpDTO(req.body);
            let data=req.body
            
            const setOtpUsecase=new SendOtpUseCase(this.otpService,this.PendingUserRepository)
            await setOtpUsecase.execute(data.email)
            res.status(200).json({status:true,message:"OTP sented"})

        }catch (error:any) {   
            console.log(error,"SDfa");
                     
            res.status(400).json({status:false,message:error.message })
        }

    }
}