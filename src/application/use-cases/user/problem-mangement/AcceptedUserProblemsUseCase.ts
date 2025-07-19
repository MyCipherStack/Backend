import { IAcceptedUserProblemsUseCase } from "@/application/interfaces/use-cases/IProblemUseCases";
import { Problem } from "@/domain/entities/Problem";
import { ISubmissionRepository } from "@/domain/repositories/ISubmissionRepository";
import { logger } from "@/logger";




export class AcceptedUserProblemsUseCase implements IAcceptedUserProblemsUseCase {
    constructor(
        private submissionRepository: ISubmissionRepository,

    ) { }


    async execute(userId: string): Promise<Problem[]> {

        const datas = await this.submissionRepository.userAcceptedSubmission(userId)

        logger.info("accepted user problem usecas", { datas })

        const problemCount = datas.reduce((acc, data) => {

            if (data.difficulty == "easy") {
                acc.easy += 1

            } else if (data.difficulty == "medium") {

                acc.medium += 1
            }
            else if (data.difficulty == "hard") {

                acc.hard += 1
            }

            return acc
        }, { easy: 0, medium: 0, hard: 0 })



        const submissions = await this.submissionRepository.userSubmissionsCount(userId)

        const totalSubmissions = submissions.reduce((acc, data) => acc + data.count, 0)


        return { datas, problemCount, totalSubmissions }

    }
}