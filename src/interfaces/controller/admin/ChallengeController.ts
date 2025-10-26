import { NextFunction, Request, Response } from 'express';
import { IUpdateRepositoryDataUseCase } from '@/application/interfaces/use-cases/ISharedUseCase';
import { AppError } from '@/domain/error/AppError';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { IChallengeRepository } from '@/domain/repositories/IChallengeRepository';
import { GroupChallenge } from '@/domain/entities/GroupChallenge';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export class ChallengeController {
  constructor(
        private challengeRepository: IChallengeRepository,
        private updateRepositoryDataUseCase: IUpdateRepositoryDataUseCase<GroupChallenge>,

  ) { }

  allGroupChallenges = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const search = req.query.search as string;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string;
      const isBlocked = req.query.isBlocked as string;

      logger.info('page', { isBlocked, search });
      const data = await this.challengeRepository.paginatedData({
        page, limit, isBlocked, search, status,
      });

      res.status(HttpStatusCode.OK).json({ message: 'all group challenge data fetched', challenges: data });
    } catch (error) {
      next(new AppError('error in getting data', HttpStatusCode.BAD_REQUEST));
    }
  };

  changeStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('change status', req.body);

      const challengeData = await this.updateRepositoryDataUseCase.execute(req.body.id, { isBlocked: req.body.isBlocked });
      logger.info('data', challengeData);
      res.status(HttpStatusCode.OK).json({ message: 'status changed', challenge: challengeData });
    } catch (error) {
      return next(new AppError('error in change status', HttpStatusCode.BAD_REQUEST));
    }
  };
}
