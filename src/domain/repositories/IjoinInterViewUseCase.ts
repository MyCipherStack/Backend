import { Interview } from "../entities/Interview";


export interface IjoinInterViewUseCase{
    execute(userId:string, interviewId:string):Promise<Interview | null>
}
