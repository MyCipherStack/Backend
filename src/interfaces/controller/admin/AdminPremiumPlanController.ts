import { Request, Response } from "express";
import { PremiumPlanDTO } from "../../../application/dto/PremiumPlanDTO.js";
import { PremiumPlanRepostiroy } from "../../../infrastructure/repositories/premiumPlanRepostiroy.js";




/// CREATE COMMON USE CASE FOR THIS TYPE OF CREATIG NEW MODEL

export class AdminPremiumPlanController{
    constructor(
    ){}

    createNewPlan=async(req:Request,res:Response)=>{
        try{
            const data=new PremiumPlanDTO(req.body)
            const premiumPlanRepostiroy=new PremiumPlanRepostiroy()

            const response=await premiumPlanRepostiroy.create(data)

            console.log(data);
            res.status(200).json({status:true,message:"new premium plan created",response})

            
        }catch(error){
            res.status(400).json({status:false,message:error})

            
        }
    }



    editPlan=async(req:Request,res:Response)=>{
        try{
            const data=new PremiumPlanDTO(req.body)
            const premiumPlanRepostiroy=new PremiumPlanRepostiroy()

            const response=await premiumPlanRepostiroy.findOneAndUpdatePlan(data.id,data)

            console.log(data);
            res.status(200).json({status:true,message:"new premium plan created",response})

            
        }catch(error){
            res.status(400).json({status:false,message:error})

            
        }
    }
}

