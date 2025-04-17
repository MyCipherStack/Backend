import { Request, Response } from "express";
import { GoogleDto } from "../../application/dto/GoogleUseDto.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { GoogleUserUSerCase } from "../../application/use-cases/GoogleUserUSerCase.js";
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm.js";
import { JwtService } from "../../services/jwt/JwtService.js";
import { IJwtService } from "../../domain/services/IJwtService.js";
import { env } from "../../config/env.js";



export class GoogleAuthController{
    
    constructor(
        private userRepository: IUserRepository,
        private hashService: IHashAlgorithm,
        private jwtService: IJwtService,
        
    ) { }


    handleSuccess=async(req:Request,res:Response)=>{
        try{
            console.log("google auth backend callll",req.user);
            
            const googleUser=new GoogleDto(req.user as any)
    
            const name=googleUser.name
            const email=googleUser.email
            const googleId=googleUser.googleId
            const image=googleUser.image

            const foundUser=await this.userRepository.findByEmail(email)
            if(foundUser?.status==="banned"){
                console.log("user blocked");
                
             return   res.status(401).json({status:false,message:"This Account is banned"})
            }
            
            const googleUseCase=new GoogleUserUSerCase(this.userRepository,this.hashService,this.jwtService)
            const createdUser=await googleUseCase.execute(name,email,image,googleId)

                 res.cookie("accessToken",createdUser.accessToken,{
                            httpOnly:true,
                            secure:env.NODE_ENV === "production",
                            sameSite:"strict",
                            maxAge:1000 * 60 * 15,
                            path:"/"
                        })
                        res.cookie("refreshToken",createdUser.refreshToken,{
                            httpOnly:true,
                            secure:env.NODE_ENV === "production",
                            sameSite:"strict",
                            maxAge:1000 * 60 * 60 * 24 * 7,
                            path:"/"
                        })
            res.redirect(`http://localhost:3000/Google?name=${encodeURIComponent(createdUser.user.name)}&email=${encodeURIComponent(createdUser.user.email)}`)
   
            // res.status(200).json({status:true,message:"user logged success",user:{name:createdUser.name,email:createdUser.email}})



        }catch(error:any){
            res.status(400).json({status:false,message:error.message })

        }
    }
}