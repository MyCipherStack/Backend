import { BaseRepository } from "../../infrastructure/repositories/BaseRespositroy.js";
import { PairProgramming } from "../entities/PairProgramming.js";




export interface IPairProgrammingRepository extends BaseRepository<PairProgramming>{
        findOneChallenge(data:Partial<PairProgramming>):Promise<PairProgramming | null>
}