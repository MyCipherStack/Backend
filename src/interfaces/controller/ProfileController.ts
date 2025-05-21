import { Request, Response } from "express";
import { ProfileDTO } from "../../application/dto/ProfileDTO.js";
import { IUpdateUserUseCase } from "../../application/interfaces/use-cases/IUpdateUserUseCase.js";
import { IGetRepositoryDataUseCase } from "../../application/interfaces/use-cases/IGetRepositoryDataUseCase.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { IVerifyUserPasswordUseCase } from "../../application/interfaces/use-cases/IVerifyUserPasswordUseCase.js";
import { ResetPasswordDTO } from "../../application/dto/ResetPasswordDTO.js";
import { IResetPasswordUseCase } from "../../application/interfaces/use-cases/IResetPasswordUseCase.js";
import { log } from "node:console";
import { User } from "../../domain/entities/User.js";

export class ProfileController{
    constructor(
        private updateUseCase:IUpdateUserUseCase,
        private getRepositoryDataUseCase:IGetRepositoryDataUseCase<User>,
        private userRepositroy:IUserRepository,
        private verifyUserPasswordUseCase:IVerifyUserPasswordUseCase,
        private resetPasswordUseCase:IResetPasswordUseCase
    ){}

    update=async(req:Request,res:Response)=>{
        try{
           console.log(req.body);
           const user=req.user as {email:string}
           console.log(user);
           

                const profileData=new ProfileDTO(req.body.personal,req.body.appearance,req.body.preferences)
                const data=await this.updateUseCase.execute(user.email,profileData)
                if(data)
                res.status(200).json({status:true,message:"problems fetched success",user:{name:data.name,email:data.email,image:data.image}})
        }catch(error:any){            
            res.status(400).json({status:false,message:error.message })
        }
    }


    getData=async(req:Request,res:Response)=>{
        try{
            console.log("getting data");
            // const email=req.query.email
            console.log(req.user,"getData user profile");
        
            const user=req.user as {email:string ,id:string}
            
            
                // const user=await this.userRepositroy.findByEmail(email)
              
                
                const profile=await this.getRepositoryDataUseCase.execute(user.id.toString())
                if(profile){
                    console.log(profile,"profiledata");
                 return  res.status(200).json({status:true,message:"Problems fetched success",user:profile})
                }else{
                 res.status(400).json({status:false,message:"Something went wrong" })
                }

            // }else{
            //     return res.status(400).json({status:false,message:"Something went wrong" })
            // }
            
        }catch(error){
          return   res.status(400).json({status:false,message:"Something went wrong while fetching data" })
        }
    }

    

    resetPassword=async(req:Request,res:Response)=>{
        try{
            console.log(req.body,"reset");
            // const currentPassword=req.body.currentPassword
            // const password=req.body.password
            // const email=req.body.email
            const data=new ResetPasswordDTO(req.body.formData,req.body.email)
            console.log(data.email);
            


        const isValid=await this.verifyUserPasswordUseCase.execute(data.email,data.currentPassword)
console.log(isValid);
        if(isValid){
            this.resetPasswordUseCase.execute(data.email,data.password)
            res.status(200).json({status:true,message:"password updated"})
        }else{
            res.status(400).json({status:false,message:"Incorrect current password" })

        }   
        }catch(error){
            console.log(error);
            
            res.status(400).json({status:false,message:"Something went wrong while fetching data" })
        }
    }
}