import { BaseRepository } from "../../infrastructure/repositories/BaseRespositroy.js";
import { Submission } from "../entities/Submission.js";


export interface  ISubmissionRepository extends BaseRepository<Submission>{
    getSubmissionsByProblem(userId:string,problemId:string):Promise<Submission[]>
}