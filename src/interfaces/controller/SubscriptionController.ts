import { Request, Response } from "express"
import { IGetRepositoryDataUseCase } from "@/application/interfaces/use-cases/IGetRepositoryDataUseCase"
import { PremiumPlan } from "@/domain/entities/PremiumPlan"

import { logger } from "../../logger";
import { AppError } from "../../domain/error/AppError";




export class SubscriptionController{
    constructor(
        private getPremiumPlanUseCase:IGetRepositoryDataUseCase<PremiumPlan>
    ){}
        
    getPlans=async(req:Request,res:Response)=>{
        console.log("get plan controller");
        
        try{ 
            const response=await this.getPremiumPlanUseCase.allDoucuments()
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
          logger.info("subscrition eeee",{subId:req.body.id,username:"adsfasf"})

        }catch(error){
            logger.error(error instanceof Error ? error.message :"unknown error" )
            throw new AppError("Error on subscribe plan",400)
        }
    }
    
}