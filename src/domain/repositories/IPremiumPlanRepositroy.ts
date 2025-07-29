import { BaseRepository } from "../../infrastructure/repositories/BaseRepository.js";
import { PremiumPlan } from "../entities/PremiumPlan.js";
import { IBaseRepository } from "./IBaseRepository.js";



export  interface IpremiumPlanRepository extends IBaseRepository<PremiumPlan>{

    findAllPlans():Promise<PremiumPlan[]>
    
}