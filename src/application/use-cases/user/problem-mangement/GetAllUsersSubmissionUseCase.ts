import { ISubmissionRepository } from "@/domain/repositories/ISubmissionRepository";
import {  IGetAllUsersSubmissionUseCase } from "@/application/interfaces/use-cases/IGetAllSubmissionByProblemuseCase";

export class GetAllUsersSubmissionUseCase implements IGetAllUsersSubmissionUseCase {
    constructor(
        private submissionRepository: ISubmissionRepository
    ) { }

    async execute(userId: string): Promise<{date:string,count:number}[]> {

        const submission = await this.submissionRepository.userSubmissionsCount(userId)

        return submission
    }

}