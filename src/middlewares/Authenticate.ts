import { NextFunction, Request, Response } from "express";
import { IJwtService } from "../domain/services/IJwtService";
import { env } from "../config/env.js";
import { IUserRepository } from "../domain/repositories/IUserRepository";



export class Authenticate{
    constructor(
        private jwtService:IJwtService,
        private userRepository:IUserRepository
    ){}
        verify=async(req:Request,res:Response,next:NextFunction)=>{
            try{
            console.log("validating user");
            // console.log(req.cookies);
            
            const accessToken=req.cookies["accessToken"]
            const refreshToken=req.cookies["refreshToken"]
            console.log(accessToken,refreshToken);
            
            if(!accessToken && !refreshToken){
                console.log("no refresh access token");
                
                return res.status(401).json({status:false,message:"login  expired"})
            }
            
            
            if(accessToken){
                console.log("accessToke found");
            
                const isValid=await this.jwtService.varifyAccessToken(accessToken)
                // const userPayload=this.jwtService.varifyAccessToken(accessToken)
                if(isValid){
                    const foundUser=await this.userRepository.findByEmail(isValid.email)
                    console.log("accessToken vaild");
                    
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
                    if(foundUser){
                        req.user={email:foundUser.email,name:foundUser.name,id:foundUser._id}   // i can use other routesn
                        return   next()
                    }else{
                        throw(new Error("use not found"))
                    }

                }
            }
            if(refreshToken){
                console.log("refreshToken found");
                const userPayload=this.jwtService.varifyRefreshToken(refreshToken)
                const {exp,iat,...payload}=userPayload
                if(userPayload){
                    const createAccesstoken=this.jwtService.signAccessToken(payload)
                    res.cookie("accessToken",createAccesstoken,{
                        httpOnly:true,
                        secure:env.NODE_ENV === "production",
                        sameSite:"strict",
                        maxAge:1000 * 60 * 15,
                        path:"/"   
                    })
                    const foundUser=await this.userRepository.findByEmail(userPayload.email)
                    if(foundUser){
                        req.user={email:foundUser.email,name:foundUser.name,id:foundUser._id}   // i can use other routesn
                        return   next()
                    }else{
                        throw(new Error("user not found"))
                    }
                }
            }
        }catch(error){
            console.log(error);
            return res.status(401).json({status:false,message:"No token"})
        }
        }


}