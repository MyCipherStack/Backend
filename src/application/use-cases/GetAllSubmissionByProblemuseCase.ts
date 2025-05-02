import { Submission } from "../../domain/entities/Submission.js";
import { ISubmissionRepository } from "../../domain/repositories/ISubmissionRepository.js";
import { IGetAllSubmissionByProblemuseCase } from "../interfaces/use-cases/IGetAllSubmissionByProblemuseCase.js";

export  class GetAllSubmissionByProblemuseCase implements IGetAllSubmissionByProblemuseCase{
    constructor(
        private submissionRepository:ISubmissionRepository
    ){}

    async execute(userId: string, problemId: string): Promise<Submission[]> {
       const submission=await this.submissionRepository.getSubmissionsByProblem(userId,problemId)
       return submission
    }
    
}