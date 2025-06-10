import { Interview } from "../entities/Interview.js";
import { IBaseRepository } from "./IBaseRepository.js";


export interface IInterViewRepository extends IBaseRepository<Interview>{
    
    findByField(data:Partial<Interview>):Promise<Interview[]>
} 