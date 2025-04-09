


import { Request, Response } from "express";
import { IOtpService } from "../../domain/services/IOtpService.js";
import { OtpDTO } from "../../application/dto/OtpDTO.js";
import { SendOtpUseCase } from "../../application/use-cases/SendOtpUseCase.js";
import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository.js";
import { ResetPasswordUseCase } from "../../application/use-cases/ResetPasswordUsecase.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";


export class ResetPassword{
    constructor(
             private UserRepository:IUserRepository

    ){

    }

    reset=async(req:Request,res:Response)=>{
        try{
            console.log("reset");
            
            // const data= new OtpDTO(req.body);
            let data=req.body
            
            const resetpass=new ResetPasswordUseCase(this.UserRepository)
            await resetpass.execute(data.email,data.password)
            res.status(200).json({status:true,message:"OTP sented"})

        }catch (error:any) {   
            console.log(error,"SDfa");
                     
            res.status(400).json({status:false,message:error.message })
        }

    }
}