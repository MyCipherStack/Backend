import { Interview } from "../entities/Interview";
import { IBaseRepository } from "./IBaseRepository";


export interface IInterViewRepository extends IBaseRepository<Interview>{

    findByField(data:Partial<Interview>):Promise<Interview[]>
}
