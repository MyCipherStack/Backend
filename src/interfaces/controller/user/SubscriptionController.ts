import { NextFunction, Request, Response } from "express"
import { IGetRepositoryDataUseCase } from "@/application/interfaces/use-cases/IGetRepositoryDataUseCase"
import { PremiumPlan } from "@/domain/entities/PremiumPlan"
import { ICreateRepoUseCase } from "@/application/interfaces/use-cases/ICreateRepoUseCase";
import { SubscriptionEntity } from "@/domain/entities/Subscription";
import { CreateSubscripctionDTO } from "@/application/dto/CreateSubscripctionDTO";
import { logger } from "@/logger";




export class SubscriptionController{
    constructor(
        private getPremiumPlanUseCase:IGetRepositoryDataUseCase<PremiumPlan>,
        private createSubscritionUseCase:ICreateRepoUseCase<SubscriptionEntity>
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


    createSubscription=async(req:Request,res:Response,next:NextFunction)=>{
        try{

        let  orderId= res.locals.orderId
        let  transactionId=res.locals. paymentId
        let  planDetails=res.locals.planDetails
        let user=req.user as {id:string}
        logger.info({meassage:"create subscription",user:req.user})
        
        const data=new CreateSubscripctionDTO({userId:user.id,transactionId,
            name:planDetails.name,
            price:planDetails.price,cycle:planDetails.cycle,
            features:planDetails.features,
            status:planDetails.status,
            trial:planDetails.trial})
        
            const response=this.createSubscritionUseCase.execute(data)
            logger.info("create subcription",{data:data,response})
            
        }catch(error){
            // console.log(error);
            
            logger.error("err",error)
        }
    }



    





    



    
}