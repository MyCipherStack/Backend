import { Submission } from "@/domain/entities/Submission";
import { ISubmissionRepository } from "@/domain/repositories/ISubmissionRepository";
import { IStreakService } from "@/domain/services/IStreakService";
import { ITestCase } from "@/application/interfaces/ITestCase";
import { IsubmitProblemUseCase } from "@/application/interfaces/use-cases/IProblemUseCases";
import { logger } from "@/infrastructure/logger/WinstonLogger/logger";
import { IProblemRepository } from "@/domain/repositories/IProblemRepository";






export class SubmitProblemUseCase implements IsubmitProblemUseCase {
    constructor(
        private submissionRespository: ISubmissionRepository,
        private streakService: IStreakService,
        private problemRepository: IProblemRepository

    ) { }
    async execute(updatedTestCases: Partial<ITestCase[]>, userId: string, problemId: string, code: string, language: string, totalTestCases: number): Promise<Submission> {


        const totalMemoryUsed = updatedTestCases.reduce((acc, testCase) => {
            return acc += testCase.memory ?? 0
        }, 0)
        const totalTimeUsed = updatedTestCases.reduce((acc, testCase) => {
            return acc += Number(testCase.runtime) ?? 0
        }, 0)



        let passedTestCases = updatedTestCases.length
        let status = "Accepted"
        let failingTestCaseResult = { input: "", output: "", compile_output: "" }
        let error = ""

        const isFailed = updatedTestCases.filter(testCase => {
            if (testCase.status == false)
                return testCase
        })
        const failedTestCase = isFailed[0]
        logger.info("failed Test Caes", failedTestCase)
        if (failedTestCase) {
            passedTestCases -= 1
            error = failedTestCase.error ?? ""
            if (failedTestCase.error) {
                status = failedTestCase.error === "Compilation Error" ? "Compilation Error" : "RunTime Error"
            } else {
                status = "Wrong Answer"

            }
            failingTestCaseResult.input = failedTestCase.input
            failingTestCaseResult.output = failedTestCase.output
            failingTestCaseResult.compile_output = failedTestCase.compile_output as string

        }


        //Calculation And Update Acceptance
        if (status == "Accepted") {
         await  this.problemRepository.updateAcceptance(problemId, 1, 1)
            
        }else{
          await  this.problemRepository.updateAcceptance(problemId, 1, 0)
        }




        //    console.log(isFailed[0],"failed tesst case");
        //    console.log( typeof totalMemoryUsed,"totalmeomory");
        //    console.log( typeof totalTimeUsed,"type if time");
        //    console.log(  totalTimeUsed,"type if time");
        //    console.log(code,"code");
        //    console.log(language,"languate");




        this.streakService.updateUserStreak(userId)

        const submission = await this.submissionRespository.create({
            userId: userId,
            problemId: problemId
            , code, language, memory: totalMemoryUsed, runTime: totalTimeUsed,
            passedTestCases, status, failingTestCaseResult, totalTestCases, error

        })

        return submission



    }

}