import { Submission } from "../../../domain/entities/Submission.js";



export interface IGetAllSubmissionByProblemuseCase{
    execute(userId:string,problemId:string):Promise<Submission[]>
}