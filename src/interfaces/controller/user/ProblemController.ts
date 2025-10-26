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

      const difficulty = req.query.difficulty as string;
      const category = req.query.category as string;
      const problemDto = new FilterDTO(req.query)

      const token = req.cookies.accessToken;
      const refreshToken = req.cookies.refreshToken;
      let sampleTestCasesOnlyData;

      if (!token && !refreshToken) {
        sampleTestCasesOnlyData = await this.getAllProblemUseCase.execute(problemDto, difficulty, category, null);
        return res.status(HttpStatusCode.OK).json({ status: true, message: 'problems fetched success', problemData: sampleTestCasesOnlyData });

      }

      const user = await this.verifyAccessTokenUseCase.execute(token ? token : refreshToken ? refreshToken : "");

      if (!user) {
        sampleTestCasesOnlyData = await this.getAllProblemUseCase.execute(problemDto, difficulty, category, null);
      } else {
        sampleTestCasesOnlyData = await this.getAllProblemUseCase.execute(problemDto, difficulty, category, user._id!.toString());
      }

      res.status(HttpStatusCode.OK).json({ status: true, message: 'problems fetched success', problemData: sampleTestCasesOnlyData });
    } catch (error) {

      logger.error('getting problems error', { error });

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

      logger.error('getting problem details error', { error });

      next(new AppError('Something went wrong', HttpStatusCode.INTERNAL_SERVER_ERROR));

    }
  };

  runProblem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const problem = new ProblemDTO(req.body.problemDetails);
      const { code,language,testCases } = req.body;

      const updatedTestCases = await this.runProblemUseCase.execute(testCases, code, language, problem.memoryLimit, problem.timeLimit, problem.functionSignatureMeta, false);

      res.status(HttpStatusCode.OK).json({ status: true, message: 'test cases runned successfuly', testResult: updatedTestCases });
    } catch (error) {
      logger.error('running problem error', { error });

      next(new AppError('Something went wrong', HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  };


  acceptedUserProblems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const acceptedData = await this.acceptedUserProblemsUseCase.execute(user?.id!);

      res.status(HttpStatusCode.OK).json({ status: true, message: 'accepted user problem', acceptedData });
    } catch (error) {

      logger.error('getting accepted user problems error', { error });

      next(new AppError('Something went wrong', HttpStatusCode.BAD_REQUEST));

    }
  };


  // AI POWERD SOLUTION

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
