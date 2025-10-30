import { NextFunction, Request, Response } from 'express';
import { InterviewDTO } from '@/application/dto/InterviewDTO';
import { ICreateRepoUseCase } from '@/application/interfaces/use-cases/ICreateRepoUseCase';
import { Interview } from '@/domain/entities/Interview';
import { IScheduleInterviewUseCase } from '@/application/interfaces/use-cases/IScheduleInterviewUseCase';
import { IjoinInterViewUseCase } from '@/domain/repositories/IjoinInterViewUseCase';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { AppError } from '@/shared/error/AppError';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';
import { ErrorMessages } from '@/shared/constants/ErrorMessages';
import { IGetAllRepoDataUsingFieldUseCase } from '@/application/interfaces/use-cases/ISharedUseCase';

export class InterviewController {
  constructor(
        private createRepoUseCase: ICreateRepoUseCase<Interview>,
        private scheduleInterviewUsecase: IScheduleInterviewUseCase,
        private joinInterViewUseCase: IjoinInterViewUseCase,
        private getAllInterviewDataUsingFieldUseCase: IGetAllRepoDataUsingFieldUseCase<Interview>,
  ) { }


  schedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = new InterviewDTO(req.body);
      const createData = await this.scheduleInterviewUsecase.execute(data);
      const { id } = req.user as { id: string };
      createData.hostId = id;
      const response = await this.createRepoUseCase.execute(createData);

      res.status(HttpStatusCode.OK).json({ status: true, message: 'schedule interview', Interview: response });
    } catch (error) {
      next(new AppError(ErrorMessages.SYSTEM.INTERNAL_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR));

    }
  };


  getUserInterviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user as { id: string };
      const userCreatedInterview = await this.getAllInterviewDataUsingFieldUseCase.execute({ hostId: id });

      const userInterviews = await this.getAllInterviewDataUsingFieldUseCase.execute({ participantId: id });
      console.log(userCreatedInterview, userInterviews);

      res.status(HttpStatusCode.OK).json({ status: true, message: 'get all interview', interviews: { userInterviews, userCreatedInterview } });
    } catch (error: unknown) {
      next(new AppError(ErrorMessages.SYSTEM.INTERNAL_ERROR , HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  };


  joinInterview = async (req: Request, res: Response, next:NextFunction) => {
    try {
      const { user } = req;

      const InterviewId = req.body.id;
      logger.info('interviewID', { InterviewId });
      const response = await this.joinInterViewUseCase.execute(user?.id.toString()!, InterviewId);

      res.status(HttpStatusCode.OK).json({ status: true, message: 'joined interview', interview: response });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ status: false, message: error.message });
      } else {
        next(new AppError(ErrorMessages.SYSTEM.INTERNAL_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR));
      }
    }
  };
}
