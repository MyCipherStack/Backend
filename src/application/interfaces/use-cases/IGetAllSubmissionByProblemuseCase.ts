import { Submission } from "@/domain/entities/Submission"


export interface IGetAllSubmissionByProblemuseCase{
    execute(userId:string, problemId:string):Promise<Submission[]>
}
export interface IGetAllUsersSubmissionUseCase{
    execute(userId:string):Promise<{date:string, count:number}[]>
}
