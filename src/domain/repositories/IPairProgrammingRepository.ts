import { BaseRepository } from "../../infrastructure/repositories/BaseRespositroy.js";
import { PairProgramming } from "../entities/PairProgramming.js";
import { IBaseRepository } from "./IBaseRepository.js";




export interface IPairProgrammingRepository extends IBaseRepository<PairProgramming>{
        findOneChallenge(data:Partial<PairProgramming>):Promise<PairProgramming | null>
}