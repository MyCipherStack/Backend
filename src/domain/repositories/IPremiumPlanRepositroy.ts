import { PremiumPlan } from "../entities/PremiumPlan";
import { IBaseRepository } from "./IBaseRepository";


export interface IpremiumPlanRepository extends IBaseRepository<PremiumPlan>{

    findAllPlans():Promise<PremiumPlan[]>

}
