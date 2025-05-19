import { PremiumPlan } from "../../domain/entities/PremiumPlan.js"
import { IpremiumPlanRepostiroy } from "../../domain/repositories/IpremiumPlanRepostiroy.js"
import { premiumPlanModel } from "../database/PremiumPlanModel.js"





export class PremiumPlanRepostiroy implements IpremiumPlanRepostiroy{
    async  create(data: PremiumPlan): Promise<PremiumPlan> {
        const createdData= await premiumPlanModel.updateOne({},data,{upsert:true})
        return createdData
    }

    async findOneAndUpdatePlan(id:string,data:PremiumPlan):Promise<PremiumPlan>{
        const updatedPlan=await premiumPlanModel.findOneAndUpdate({id},{data})
        return updatedPlan
    }


} 