import { NextFunction, Request, Response } from "express";
import { IJwtService } from "../domain/services/IJwtService.js";
import { JwtService } from "../services/jwt/JwtService.js";
import { env } from "../config/env.js";
import { IUserRepository } from "../domain/repositories/IUserRepository.js";



export class Authenticate{
    constructor(
        private jwtService:IJwtService,
        private userRepository:IUserRepository
    ){

    }

        verify=async(req:Request,res:Response,next:NextFunction)=>{
            console.log("validating user");
            
        const accessToken=req.cookies["accessToken"]
        const refreshToken=req.cookies["refreshToken"]
        console.log(accessToken,refreshToken);

        if(!accessToken && !refreshToken){
            console.log("no refresh access token");
            
            return res.status(401).json({status:false,message:"login  expired"})
        }
        const userPayload=this.jwtService.varifyRefreshToken(refreshToken)

        const foundUser=await this.userRepository.findByUserName(userPayload.name)
        if(foundUser?.status==="banned"){
            console.log("user blocked");

            res.clearCookie('accessToken', {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            });
            
            res.clearCookie('refreshToken', {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            });
            
          return   res.status(401).json({status:false,message:"This Account is banned"})
        }
        
      
        try{
            if(accessToken){
                console.log("accessToke found");
                
                const isValid=await this.jwtService.varifyAccessToken(accessToken)
                req.user=isValid    // i can use other routes
                next()
            }
            if(refreshToken){
                console.log("refreshToken found");
                const userPayload=this.jwtService.varifyRefreshToken(refreshToken)
                if(userPayload){
                    const createAccesstoken=this.jwtService.signAccessToken(userPayload)
                    res.cookie("accessToken",createAccesstoken,{
                        httpOnly:true,
                        secure:env.NODE_ENV === "production",
                        sameSite:"strict",
                        maxAge:1000 * 60 * 15,
                        path:"/"   
                    })
                next()
                }
            }
        }catch(error){
            console.log(error);
            
            return res.status(401).json({status:false,message:"No token"})
            
        }
        }


}