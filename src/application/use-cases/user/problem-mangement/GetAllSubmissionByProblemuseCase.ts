import { Submission } from "@/domain/entities/Submission"; 
import { ISubmissionRepository } from "@/domain/repositories/ISubmissionRepository"; 
import { IGetAllSubmissionByProblemuseCase } from "@/application/interfaces/use-cases/IGetAllSubmissionByProblemuseCase"; 

export  class GetAllSubmissionByProblemuseCase implements IGetAllSubmissionByProblemuseCase{
    constructor(
        private submissionRepository:ISubmissionRepository
    ){}

    async execute(userId: string, problemId: string): Promise<Submission[]> {
       const submission=await this.submissionRepository.getSubmissionsByProblem(userId,problemId)
       return submission
    }
    
}