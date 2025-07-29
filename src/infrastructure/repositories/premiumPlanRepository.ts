import { Document } from "mongoose"
import { PremiumPlan } from "../../domain/entities/PremiumPlan"
import { IpremiumPlanRepository } from "../../domain/repositories/IPremiumPlanRepositroy"
import { IPlanDocument, premiumPlanModel } from "../database/PremiumPlanModel"
import { BaseRepository } from "./BaseRepository"





export class PremiumPlanRepository extends BaseRepository<PremiumPlan,IPlanDocument> implements IpremiumPlanRepository{
    // async  create(data: PremiumPlan): Promise<PremiumPlan> {
    //     const createdData= await premiumPlanModel.updateOne({},data,{upsert:true})
    //     return createdData
    // }

    // async findOneAndUpdatePlan(id:string,data:PremiumPlan):Promise<PremiumPlan>{
    //     const updatedPlan=await premiumPlanModel.findOneAndUpdate({id},{data})
    //     return updatedPlan
    // }
    constructor(){
        super(
            premiumPlanModel
        )
    }

    async findAllPlans(): Promise<PremiumPlan[]> {
        const allPlans=await premiumPlanModel.find()
        console.log(allPlans);
        
        return allPlans.map(doc=>this.toEntity(doc)).filter(doc=>doc!=null)
    }
        
    protected toEntity(data:IPlanDocument & Document<unknown>): PremiumPlan | null {
        if(!data) return null
        return new PremiumPlan(
            data.name,
            data.price,
            data.cycle,
            data.features,
            data.trial,
            data.status,
            data._id?.toString()
        )
    }


} 