import { NextFunction, Request, Response } from "express";
import { GoogleDto } from "@/application/dto/GoogleUseDto";
import { IGoogleUserUseCase } from "@/application/interfaces/use-cases/IUserUseCase";
import { AppError } from "@/domain/error/AppError";
import { env } from "@/config/env";



export class GoogleAuthController{
    
    constructor(

        private googleUserUseCase:IGoogleUserUseCase
        
    ) { }


    handleSuccess=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log("google auth backend callll",req.user);
            
            const googleUser=new GoogleDto(req.user as any)
    
            const name=googleUser.name
            const email=googleUser.email
            const googleId=googleUser.googleId
            const image=googleUser.image

        

            const createdUser=await this.googleUserUseCase.execute(name,email,image,googleId)

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
            res.redirect(`${env.GOOGLE_URL}/Google?name=${encodeURIComponent(createdUser.user.name)}&email=${encodeURIComponent(createdUser.user.email)}`)
   
            // res.status(200).json({status:true,message:"user logged success",user:{name:createdUser.name,email:createdUser.email}})



        }catch(error:any){
            // res.status(400).json({status:false,message:error.message })

            next(new AppError(error.messag,400))
        }
    }
}