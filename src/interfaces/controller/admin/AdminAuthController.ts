import { Request, Response } from "express";
import { LoginAdminUsecase } from "../../../application/use-cases/LoginAdminUsecase.js";
import { IAdminRepository } from "../../../domain/repositories/IadminRepository.js";
import { IHashAlgorithm } from "../../../domain/services/IHashAlgorithm.js";
import { IJwtService } from "../../../domain/services/IJwtService.js";
import { LoginDTO } from "../../../application/dto/LoginDTO.js";
import { env } from "../../../config/env.js";


export class AdminAuthController{

 constructor(
        private adminRepository:IAdminRepository,
        private hashService:IHashAlgorithm,
        private JwtService:IJwtService
    ){}


login=async(req:Request,res:Response)=>{
    try{


        console.log("admin login");
        
console.log(req.body);

   
        const data=new LoginDTO(req.body)
        const  loginUseCase= new LoginAdminUsecase(this.adminRepository,this.hashService,this.JwtService)
        const adminData  = await loginUseCase.execute(data.identifier,data.password)

         res.cookie("adminAccessToken",adminData.accessToken,{
                        httpOnly:true,
                        secure:env.NODE_ENV === "production",
                        sameSite:"strict",
                        maxAge:1000 * 60 * 15,
                        path:"/"
                    })
console.log(adminData);
console.log(adminData.admin);

            res.status(200).json({status:true,message:" logged successfull",admin:adminData.admin})

        
    }catch(error){
        console.log(error);
        res.status(400).json({status:false,message:error.message })

    }

}


logout=(req:Request,res:Response):Response=>{
    console.log("logout controller is working");
    
            res.clearCookie('adminAccessToken', {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            });
            

            return res.status(200).json({ message: 'Logged out successfully' });
        }
            
    
}