import { Interview } from "../entities/Interview.js";


export interface IjoinInterViewUseCase{
    execute(userId:string,interviewId:string):Promise<Interview | null>
}