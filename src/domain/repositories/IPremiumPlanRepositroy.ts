import { BaseRepository } from "../../infrastructure/repositories/BaseRespositroy.js";
import { PremiumPlan } from "../entities/PremiumPlan.js";
import { IBaseRepository } from "./IBaseRepository.js";



export  interface IpremiumPlanRepostiroy extends IBaseRepository<PremiumPlan>{
    
}