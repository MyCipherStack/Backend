import { NextFunction, Request, Response } from "express";
import { IProblemRepository } from "@/domain/repositories/IProblemRepository";
import { ProblemDTO } from "@/application/dto/ProblemDTO";
import { IRunProblemUseCase, IsubmitProblemUseCase } from "@/application/interfaces/use-cases/IProblemUseCases";
import { IGetRepositoryDataUseCase } from "@/application/interfaces/use-cases/IGetRepositoryDataUseCase";
import { Problem } from "@/domain/entities/Problem";
import { AppError } from "@/domain/error/AppError";
import { logger } from "@/logger";



export class ProblemController {
    constructor(
        private problemRespository: IProblemRepository,
        private runProblemUseCase: IRunProblemUseCase,
        private getProblemDataUseCase: IGetRepositoryDataUseCase<Problem>,
        private submitProblemUseCase: IsubmitProblemUseCase
    ) { }
    getData = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const difficulty = req.query.difficulty as string;
            const category = req.query.category as string;
            const status = req.query.status as string;
            const search = req.query.search as string;

            console.log(category, difficulty);


            const data = await this.problemRespository.getFilterProblem({ page, limit, difficulty, status, search, category })
            //  console.log(data,"datasss");
            const problems = data.problems.map((problem) => {
                return {
                    ...problem,
                    testCases: problem.testCases.filter((tc) => tc.isSample)
                }
            })
            const sampleTestCasesOnlyData = { ...data, problems }

            res.status(200).json({ status: true, message: "problems fetched success", problemData: sampleTestCasesOnlyData })
            return
        } catch (error) {
            console.log(error);
            next(new AppError("Something went wrong", 500))


        }
    }


    problemDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {

            logger.info("problem details")
            const title = req.query.search as string;




            let problem = await this.problemRespository.findBytitle(title)

            if (problem) {

                problem = {
                    ...problem,
                    testCases: problem.testCases.filter((tc) => tc.isSample)
                }
            }
            const sampleTestCasesOnlyData = { problem }

            logger.info("problem", problem)

            res.status(200).json({ status: true, message: "problems fetched success", problem })
            return

        } catch (error) {
            console.log(error);
            next(new AppError("Something went wrong", 500))


        }
    }

    runProblem = async (req: Request, res: Response, next: NextFunction) => {
        try {


            const problem = new ProblemDTO(req.body.problemDetails)
            const code = req.body.code
            const language = req.body.language
            let testCases = req.body.testCases
            console.log(code);

            const updatedTestCases = await this.runProblemUseCase.execute(testCases, code, language, problem.memoryLimit, problem.timeLimit, problem.functionSignatureMeta, false)
            console.log(updatedTestCases);

            res.status(200).json({ status: true, message: "test cases runned successfuly", testResult: updatedTestCases })

        } catch (error) {
            console.log(error);
            next(new AppError("Something went wrong", 500))

            // res.status(400).json({ status: false, message: error.message })
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

            //    const totalMemoryUsed=updatedTestCases.reduce((acc,testCase)=>{
            //      return  acc+= testCase.memory ?? 0
            //     },0)
            //    const totalTimeUsed=updatedTestCases.reduce((acc,testCase)=>{
            //      return  acc+= testCase.runtime ?? 0
            //     },0)

            //     let passedTestCases=updatedTestCases.length
            //     let status="Accepted"
            //     let failingTestCaseResult={input:"",output:"",compile_output:""}

            //     const isFailed=updatedTestCases.filter(testCase=>{
            //          if(testCase.status==false)
            //             return testCase
            //     })
            //     const failedTestCase=isFailed[0]
            //     if(failedTestCase){
            //         passedTestCases-=1
            //         status="Wrong Answer"
            //         failingTestCaseResult.input=failedTestCase.input
            //         failingTestCaseResult.output=failedTestCase.output
            //         failingTestCaseResult.compile_output=failedTestCase.compile_output as string

            //     }
            //     console.log(isFailed[0],"failed tesst case");

            //     console.log(totalMemoryUsed,"totalmeomory");



            const submitData = await this.submitProblemUseCase.execute(updatedTestCases, user.id, problem._id, code, language, totalTestCases)
            console.log(submitData);
            res.status(200).json({ status: true, message: "problem submited", submissions: submitData })


        } catch (error) {
            logger.error("err", error)
            next(new AppError("Something went wrong", 500))

            // res.status(400).json({ status: false, message: "something went wrong" })


        }
    }

}