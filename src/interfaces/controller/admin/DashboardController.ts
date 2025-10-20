import { NextFunction, Request, Response } from 'express';
import { IAdminDashBoardUseCase } from '@/application/interfaces/use-cases/IAdminUseCase';
import { AppError } from '@/domain/error/AppError';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export class DashboardBoardController {
  constructor(
        private adminDashBoardUseCase: IAdminDashBoardUseCase,
  ) { }

  getAllDashBoardData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const range = req.query.range as string;
      const data = await this.adminDashBoardUseCase.execute(range);

      logger.info('range', { data });
      if (data) {
        res.status(HttpStatusCode.OK).json({
          status: true,
          userData: data.userData,
          totalUsers: data.totalUsers,
          premiumUsers: data.premiumUsers,
          transactions: data.transactions,
          thisMonthRevenu: data.thisMonthRevenu,

        });
      } else {
        next(new AppError('server Error', HttpStatusCode.INTERNAL_SERVER_ERROR));
      }
    } catch (error) {
      next(new AppError('server Error', HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  };
}
