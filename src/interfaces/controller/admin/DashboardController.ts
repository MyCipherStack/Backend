import { NextFunction, Request, Response } from 'express';
import { IAdminDashBoardUseCase } from '@/application/interfaces/use-cases/IAdminUseCase';
import { AppError } from '@/shared/error/AppError';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';
import { ErrorMessages } from '@/shared/constants/ErrorMessages';

export class DashboardBoardController {
  constructor(
        private adminDashBoardUseCase: IAdminDashBoardUseCase,
  ) { }

  getAllDashBoardData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const range = req.query.range as string;
      const dashboardData = await this.adminDashBoardUseCase.execute(range);

      logger.info('range', { dashboardData });
      if (dashboardData) {
        res.status(HttpStatusCode.OK).json({
          status: true,
          userData: dashboardData.userData,
          totalUsers: dashboardData.totalUsers,
          premiumUsers: dashboardData.premiumUsers,
          transactions: dashboardData.transactions,
          thisMonthRevenu: dashboardData.thisMonthRevenu,

        });
      } else {
        next(new AppError(ErrorMessages.SYSTEM.INTERNAL_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR));
      }
    } catch (error) {
      next(new AppError(ErrorMessages.SYSTEM.INTERNAL_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  };
}
