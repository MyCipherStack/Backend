import { NextFunction, Request, Response } from "express";
import { IJwtService } from "../domain/services/IJwtService.js";
import { JwtService } from "../services/jwt/JwtService.js";
import { env } from "../config/env.js";



export class Authenticate{
    constructor(
        private jwtService:IJwtService
    ){

    }

        verify=async(req:Request,res:Response,next:NextFunction)=>{

        const accessToken=req.cookies["accessToken"]
        const refreshToken=req.cookies["refreshToken"]
        console.log(accessToken,refreshToken);

        if(!accessToken && !refreshToken){
            console.log("no refresh access token");
            
            return res.status(401).json({status:false,message:"No token"})
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