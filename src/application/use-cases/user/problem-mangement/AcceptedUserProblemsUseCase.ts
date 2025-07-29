
import { IAcceptedUserProblemsUseCase } from "@/application/interfaces/use-cases/IProblemUseCases";
import { Problem } from "@/domain/entities/Problem";
import { IProblemRepository } from "@/domain/repositories/IProblemRepository";
import { ISubmissionRepository } from "@/domain/repositories/ISubmissionRepository";
import { logger } from "@/infrastructure/logger/WinstonLogger/logger";




export class AcceptedUserProblemsUseCase implements  IAcceptedUserProblemsUseCase{
    constructor(
        private submissionRepository: ISubmissionRepository,
        private problemRepository: IProblemRepository

    ) { }


    async execute(userId: string): Promise<{
        datas: Problem[]; problemCount: {
            easy: number;
            medium: number;
            hard: number;
        }; totalSubmissions: number,
        totalProblemsCount:Record<string,number>,
    }> {

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

        const totalProblems = await this.problemRepository.totalProblemsDifficulty()

        logger.info("totalProblemCount:",totalProblems)        


      let  totalProblemsCount= totalProblems.reduce((acc:{[key:string]:number},obj)=>{
            acc[obj.difficulty]=obj.count
            return acc
        },{})

        const totalSubmissions = submissions.reduce((acc, data) => acc + data.count, 0)

        logger.info("totalProblemCount:",totalProblemsCount)        
        return { datas, problemCount,totalProblemsCount ,totalSubmissions }

    }
}