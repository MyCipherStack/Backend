import { Request, Response } from "express";
import { CreateUserUseCase } from "@/application/use-cases/CreateUserUseCase";
import { CreateUserDTO } from "@/application/dto/CreateUserDTO";

import { IHashAlgorithm } from "@/domain/services/IHashAlgorithm";
import { IUserRepository } from "@/domain/repositories/IUserRepository"; 
import { LoginUserUseCase } from "@/application/use-cases/LoginUserUseCase"; 
import { LoginDTO } from "@/application/dto/LoginDTO"; 
import { IJwtService } from "@/domain/services/IJwtService"; 
import { env } from "@/config/env"; 
import { IPendingUserRepository } from "@/domain/repositories/IPendingUserRepository"; 
import { IOtpService } from "@/domain/services/IOtpService";
import { SendOtpUseCase } from "@/application/use-cases/SendOtpUseCase";


// CreateUserUseCase, something like RegisterUserUseCase may better express intent (since it includes OTP logic right after).


export class AuthController {
    constructor(
        private userRepository: IUserRepository,
        private hashService: IHashAlgorithm,
        private JwtService:IJwtService,
        private otpService:IOtpService,
        private PendingUserRepository:IPendingUserRepository
    ) { }

    register = async (req: Request, res: Response) => {
        try {
            const userData = new CreateUserDTO(req.body)
            const createUser = new CreateUserUseCase(this.userRepository, this.hashService,this.PendingUserRepository);
            const createdUserEmail = await createUser.execute(userData.name, userData.email, userData.password)
            const setOtpUsecase=new SendOtpUseCase(this.otpService,this.PendingUserRepository)
            if(createdUserEmail){
                await setOtpUsecase.execute(createdUserEmail)
                res.status(201).json({status:true,message:"OTP sented"})
            }else{
            res.status(400).json({status:false,message:"Something wentwrong"})
            }
        } catch (error:any) {
            console.log(error.message,"backe end err in auth controller");
            console.log(error);
            
            res.status(400).json({status:false,message:error.message })
        }
    }

    login=async(req:Request,res:Response)=>{
        try{

            const loginData=new LoginDTO(req.body)
            const loginUsecase=new LoginUserUseCase(this.userRepository,this.hashService,this.JwtService)
            let loginUserData= await loginUsecase.execute(loginData.identifier,loginData.password)
            console.log(loginUserData,"login use in controller");


            res.cookie("accessToken",loginUserData.accessToken,{
                httpOnly:true,
                secure:env.NODE_ENV === "production",
                sameSite:"strict",
                maxAge:1000 * 60 * 15,
                path:"/"
            })
            res.cookie("refreshToken",loginUserData.refreshToken,{
                httpOnly:true,
                secure:env.NODE_ENV === "production",
                sameSite:"strict",
                maxAge:1000 * 60 * 60 * 24 * 7,
                path:"/"
            })
           
            res.status(200).json({status:true,message:"user logged success",user:loginUserData.user})

        }
        catch(error:any){
            console.log(error.message);
            
            res.status(400).json({status:false,message:error.message })
        } 

    }   

}