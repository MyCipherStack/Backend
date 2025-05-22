import { Request, Response } from "express";
import { PremiumPlanDTO } from "../../../application/dto/PremiumPlanDTO.js";
import { IpremiumPlanRepository } from "../../../domain/repositories/IPremiumPlanRepositroy.js";




/// CREATE COMMON USE CASE FOR THIS TYPE OF CREATIG NEW MODEL

export class AdminPremiumPlanController{
    constructor(
      private  premiumPlanRepository:IpremiumPlanRepository 

    ){}

    createNewPlan=async(req:Request,res:Response)=>{
        try{
            const data=new PremiumPlanDTO(req.body)
            console.log(data,"create");
            // const premiumPlanRepository=new premiumPlanRepository()
            const response=await this.premiumPlanRepository.create(data)

            res.status(200).json({status:true,message:"new premium plan created",response})

            
        }catch(error){
            console.log(error);
            
            res.status(400).json({status:false,message:error})

            
        }
    }



    editPlan=async(req:Request,res:Response)=>{
        try{
            const data=new PremiumPlanDTO(req.body)
            // const premiumPlanRepository=new PremiumPlanRepository()
            console.log(data,"edit");

            const response=await this.premiumPlanRepository.updateOneById(data._id,data)

            res.status(200).json({status:true,message:"new premium plan created",response})

            
        }catch(error){  
            res.status(400).json({status:false,message:error})
        }
    }

    
    getPlans=async(req:Request,res:Response)=>{
        try{
            const response=await this.premiumPlanRepository.findAllPlans()
            console.log(response);
            
            res.status(200).json({status:true,message:" fetched all Plans",plans:response})
        }catch(error){
            res.status(400).json({status:false,message:error})
        }
    }
}



