import { Request, Response } from "express";
import { ProfileDTO } from "../../application/dto/ProfileDTO.js";
import { IUpdateUserUseCase } from "../../application/interfaces/use-cases/IUpdateUserUseCase.js";
import { IGetRepositoryDataUseCase } from "../../application/interfaces/use-cases/IGetRepositoryDataUseCase.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";

export class ProfileController{
    constructor(
        private updateUseCase:IUpdateUserUseCase,
        private getRepositoryDataUseCase:IGetRepositoryDataUseCase<ProfileDTO>,
        private userRepositroy:IUserRepository
        
    ){}

    update=async(req:Request,res:Response)=>{
        try{
            console.log("updating started");
            
            const profileData=new ProfileDTO(req.body.personal,req.body.appearance,req.body.preferences)
            const data=await this.updateUseCase.execute(profileData.email,profileData)
            res.status(200).json({status:true,message:"problems fetched success",user:data})

            console.log("updated");
            
            console.log(data);
        }catch(error){
            res.status(400).json({status:false,message:error })

            
        }
    }

    getData=async(req:Request,res:Response)=>{
        try{
            console.log("getting data");
            const email=req.query.email
            console.log(email);
            
            if(typeof email==="string"){
                const user=await this.userRepositroy.findByEmail(email)
                console.log(user);
                
                if(user && user._id){
                    console.log(user._id);
                    
                    const profile=await this.getRepositoryDataUseCase.execute(user._id.toString())
                    console.log(profile,"profiledata");
                    res.status(200).json({status:true,message:"problems fetched success",user:profile})
                }else{
                 res.status(400).json({status:false,message:"something went wrong" })

                }
                
             return 
            }else{
                console.log("profileee");
                
            }

        }catch(error){
            console.log(error);
            
        }
    }
}