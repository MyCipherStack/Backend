import { Request, Response } from "express"
import { IpremiumPlanRepository } from "../../domain/repositories/IPremiumPlanRepositroy.js"



export class PremiumController{
    constructor(
        private premiumPlanRepository:IpremiumPlanRepository
    ){}
        
    getPlans=async(req:Request,res:Response)=>{
        try{
            const response=await this.premiumPlanRepository.findAllPlans()
            if(response){
                const plans=response.filter(plan=>plan.status!="deleted")
                res.status(200).json({status:true,message:" fetched all Plans",plans})
            }
            
        }catch(error){
            res.status(400).json({status:false,message:error})
        }
    }
}