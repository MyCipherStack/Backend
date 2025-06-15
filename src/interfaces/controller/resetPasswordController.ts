


import { Request, Response } from "express";
import { ResetPasswordUseCase } from "../../application/use-cases/ResetPasswordUsecase";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm";


export class ResetPasswordContoller{
    constructor(
            private UserRepository:IUserRepository,
            private hashService:IHashAlgorithm
    ){}

    reset=async(req:Request,res:Response)=>{
        try{
            console.log("reset");
            let cookie=req.cookies["otpAccess"]
            const data=req.body
            console.log(cookie,"SADf");
            console.log(data,"data");
            console.log(data.password,"password");
            
            if(!cookie){
                console.log("ASdfasdfasdfasdf");
                throw new Error("Session expired.Please request OTP again.")
            }
            // const isValid=await this.jwtService.varifyAccessToken(cookie)
            // console.log(isValid,"toke report");
            
       

                const resetpass=new ResetPasswordUseCase(this.UserRepository,this.hashService)
                
                await resetpass.execute(cookie.email,data.password)
        
            res.status(200).json({status:true,message:"password changed"})

        }catch (error:any) {   
            console.log(error,"SDfa");
                     
            res.status(400).json({status:false,message:error.message })
        }

    }
}