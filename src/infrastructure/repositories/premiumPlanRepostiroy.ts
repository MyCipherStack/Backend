import { PremiumPlan } from "../../domain/entities/PremiumPlan.js"
import { IpremiumPlanRepostiroy } from "../../domain/repositories/IPremiumPlanRepositroy.js"
import { IPlan, premiumPlanModel } from "../database/PremiumPlanModel.js"
import { BaseRepository } from "./BaseRespositroy.js"





export class PremiumPlanRepostiroy extends BaseRepository<PremiumPlan,IPlan> implements IpremiumPlanRepostiroy{
    // async  create(data: PremiumPlan): Promise<PremiumPlan> {
    //     const createdData= await premiumPlanModel.updateOne({},data,{upsert:true})
    //     return createdData
    // }

    // async findOneAndUpdatePlan(id:string,data:PremiumPlan):Promise<PremiumPlan>{
    //     const updatedPlan=await premiumPlanModel.findOneAndUpdate({id},{data})
    //     return updatedPlan
    // }


    
    protected toEntity(data: any): PremiumPlan | null {
        if(!data) return null
        return new PremiumPlan(
            data.name,
            data.price,
            data.cycle,
            data.features,
            data.trial,
            data.status,
            data._id
        )
    }


} 