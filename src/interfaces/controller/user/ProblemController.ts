import { NextFunction, Request, Response } from 'express';
import { IProblemRepository } from '@/domain/repositories/IProblemRepository';
import { ProblemDTO } from '@/application/dto/ProblemDTO';
import { IAcceptedUserProblemsUseCase, IGetAllProblemUseCase, IRunProblemUseCase } from '@/application/interfaces/use-cases/IProblemUseCases';
import { AppError } from '@/domain/error/AppError';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { IGeneratePrompt, ISendToOllama } from '@/domain/services/IOllama';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';
import { FilterDTO } from '@/application/dto/FilterDTO';
import { IVerifyAccessTokenUseCase } from '@/application/interfaces/use-cases/IUserUseCase';

export class ProblemController {
  constructor(
    private getAllProblemUseCase: IGetAllProblemUseCase,
    private problemRepository: IProblemRepository,
    private runProblemUseCase: IRunProblemUseCase,
    private acceptedUserProblemsUseCase: IAcceptedUserProblemsUseCase,
    private verifyAccessTokenUseCase: IVerifyAccessTokenUseCase,
    private generatePrompt: IGeneratePrompt,
    private ollamaAi: ISendToOllama,

  ) { }

  getData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const page = parseInt(req.query.page as string) || 1;
      // const limit = parseInt(req.query.limit as string) || 10;
      // const status = req.query.status as string;
      // const search = req.query.search as string;
      const difficulty = req.query.difficulty as string;
      const category = req.query.category as string;

    
       

      const problemDto = new FilterDTO(req.query)

      console.log(problemDto,req.body);
      

      // const data = await this.problemRepository.getFilterProblem({ ...problemDto,difficulty, category,
      // });
      // const problems = data.problems.map((problem) => ({
      //   ...problem,
      //   testCases: problem.testCases.filter((tc) => tc.isSample),
      // }));
      // const sampleTestCasesOnlyData = { ...data, problems };

      //   const userId=req.user?._id!;

      //  logger.info('userId', { userId }); 


      const user = await this.verifyAccessTokenUseCase.execute(req.cookies.accessToken)

      let sampleTestCasesOnlyData;
      if (!user) {
        sampleTestCasesOnlyData = await this.getAllProblemUseCase.execute(problemDto, difficulty, category, null);

      } else {
        sampleTestCasesOnlyData = await this.getAllProblemUseCase.execute(problemDto, difficulty, category, user._id!.toString());

      }


      res.status(HttpStatusCode.OK).json({ status: true, message: 'problems fetched success', problemData: sampleTestCasesOnlyData });
    } catch (error) {
      console.log(error);
      next(new AppError('Something went wrong', HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  };

  problemDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('problem details');
      const title = req.query.search as string;

      let problem = await this.problemRepository.findByTittle(title);

      if (problem) {
        problem = {
          ...problem,
          testCases: problem.testCases.filter((tc) => tc.isSample),
        };
      }
      const sampleTestCasesOnlyData = { problem };

      logger.info('problem', problem);

      res.status(HttpStatusCode.OK).json({ status: true, message: 'problems fetched success', problem });
    } catch (error) {
      console.log(error);
      next(new AppError('Something went wrong', HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  };

  runProblem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const problem = new ProblemDTO(req.body.problemDetails);
      const { code } = req.body;
      const { language } = req.body;
      const { testCases } = req.body;
      console.log(code);

      const updatedTestCases = await this.runProblemUseCase.execute(testCases, code, language, problem.memoryLimit, problem.timeLimit, problem.functionSignatureMeta, false);
      console.log(updatedTestCases);

      res.status(HttpStatusCode.OK).json({ status: true, message: 'test cases runned successfuly', testResult: updatedTestCases });
    } catch (error) {
      console.log(error);
      next(new AppError('Something went wrong', HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  };

  acceptedUserProblems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.user?.id;

      logger.info('accepted problem', id);
      const acceptedData = await this.acceptedUserProblemsUseCase.execute(id!);

      res.status(HttpStatusCode.OK).json({ status: true, message: 'accepted user problem', acceptedData });
    } catch (error) {
      next(new AppError('Something went wrong', HttpStatusCode.BAD_REQUEST));
    }
  };

  solution = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const problemId = req.params.id;

      // const problemDetails = await this.problemRepository.findById(problemId);

      // const prompt = this.generatePrompt.createSolutionPrompt(problemDetails!, 'javascript');

      // res.status(HttpStatusCode.OK).json({ status: true, message: 'ollama solution' });

      // const ollamoutput = await this.ollamaAi.generateResponse(prompt);

      // logger.info('ollamoutput', { ollamoutput });
    } catch (error) {
      logger.error('gettiing solution errr', error);
      next(new AppError('Something went wrong', 500));
    }
  };
}
