import { Submission } from '@/domain/entities/Submission';

export interface IGetRecentSubmissionUseCase{
    execute(userId:string, limit:number):Promise<Submission[]>
}
