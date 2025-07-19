import { NextFunction, Request, Response } from "express";
import { IGetAllSubmissionByProblemuseCase, IGetAllUsersSubmissionUseCase } from "../../../application/interfaces/use-cases/IGetAllSubmissionByProblemuseCase";
import { AppError } from "@/domain/error/AppError";
import { logger } from "@/logger";
import { IGetRecentSubmissionUseCase } from "@/application/interfaces/use-cases/ISubmissoinUseCase";
import { ProblemDTO } from "@/application/dto/ProblemDTO";
import { IGetRepositoryDataUseCase } from "@/application/interfaces/use-cases/IGetRepositoryDataUseCase";
import { Problem } from "@/domain/entities/Problem";
import { IRunProblemUseCase, IsubmitProblemUseCase } from "@/application/interfaces/use-cases/IProblemUseCases";





export class SubmissionController {

    constructor(
        private getAllSubmissionByProblemuseCase: IGetAllSubmissionByProblemuseCase,
        private getAllUsersSubmissionUseCase: IGetAllUsersSubmissionUseCase,
        private getRecentSubmissionUseCase: IGetRecentSubmissionUseCase,
        private getProblemDataUseCase: IGetRepositoryDataUseCase<Problem>,
        private submitProblemUseCase: IsubmitProblemUseCase,
        private runProblemUseCase: IRunProblemUseCase,

    ) { }


    getSubmissionData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { problemId } = req.query as { problemId: string }

            const user = req.user as { id: "string" }

            const submissions = await this.getAllSubmissionByProblemuseCase.execute(user.id, problemId)

            res.status(200).json({ status: true, message: "test submissiondata by problem", submissions })

        } catch (error) {

            next(new AppError("Something went wrong", 500))

            // res.status(400).json({status:false,message:"Something went wrong"})
        }
    }



    getUserSubmissonsCount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user as { id: "string" }

            const submissions = await this.getAllUsersSubmissionUseCase.execute(user.id)

            logger.info("allsubmmsion with date", submissions)
            res.status(200).json({ status: true, message: "all user Submission", submissions })

        } catch (error) {
            logger.error("err", { error })

            return next(new AppError("Something went wrong", 500))


        }
    }


    recentSubmissions = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user as { id: "string" }

            const recentSubmissions = await this.getRecentSubmissionUseCase.execute(user.id, 10)

            logger.info("recent submission", { recentSubmissions })

            res.status(200).json({ status: true, message: "all user Submission", submissions: recentSubmissions })


        } catch (error) {

            return next(new AppError("Something went wrong", 500))


        }
    }

    submitProblem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const problem = new ProblemDTO(req.body.problemDetails)
            const code = req.body.code
            const language = req.body.language
            let testCases = req.body.testCases  //this have only sampleTestCase
            const user = req.user as { id: string }
            const ProblemWithAlltestCases = await this.getProblemDataUseCase.OneDocumentByid(problem._id)
            const AllTestCases = ProblemWithAlltestCases?.testCases ?? []
            const updatedTestCases = await this.runProblemUseCase.execute(AllTestCases, code, language, problem.memoryLimit, problem.timeLimit, problem.functionSignatureMeta, true)

            const totalTestCases = ProblemWithAlltestCases?.testCases.length ?? 0


            const submitData = await this.submitProblemUseCase.execute(updatedTestCases, user.id, problem._id, code, language, totalTestCases)
            console.log(submitData);
            res.status(200).json({ status: true, message: "problem submited", submissions: submitData })


        } catch (error) {
            logger.error("err", error)
            next(new AppError("Something went wrong", 500))



        }
    }


    






}