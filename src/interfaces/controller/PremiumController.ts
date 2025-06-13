import { Request, Response } from "express"
import { IpremiumPlanRepository } from "../../domain/repositories/IPremiumPlanRepositroy.js"
import { IGetRepositoryDataUseCase } from "@/application/interfaces/use-cases/IGetRepositoryDataUseCase.js"
import { PremiumPlan } from "@/domain/entities/PremiumPlan.js"



export class PremiumController{
    constructor(
        private getPremiumPlanUseCase:IGetRepositoryDataUseCase<PremiumPlan>
    ){}
        
    getPlans=async(req:Request,res:Response)=>{
        console.log("get plan controller");
        
        try{
            console.log(req.body.id);
            
            const response=await this.getPremiumPlanUseCase.execute(req.body.id)
            console.log(response);
            if(response){
                
                const plans=response.filter(plan=>plan.status!="deleted")
                res.status(200).json({status:true,message:" fetched all Plans",plans})
            }
            
        }catch(error){
            console.log(error);
            
            res.status(400).json({status:false,message:error})
        }
    }



    subscribePlan=async(req:Request,res:Response)=>{
        try{
            
        }catch(error){
            res.status(400).json({status:false,message:error})

        }
    }
    
}