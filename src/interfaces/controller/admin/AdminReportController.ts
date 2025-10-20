import { NextFunction, Request, Response } from 'express';
import { FilterDTO } from '@/application/dto/FilterDTO';
import { IChangeRepoStatusUseCase } from '@/application/interfaces/use-cases/ISharedUseCase';
import { IGetAllReportsUsecase } from '@/application/interfaces/use-cases/IReportUseCase';

import { AppError } from '@/domain/error/AppError';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { Report } from '@/domain/entities/Report';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export class AdminReportController {
  constructor(
    private getAllReportsUsecase: IGetAllReportsUsecase,
    private changeRespoStatusUseCase: IChangeRepoStatusUseCase<Report>,
  ) { }

  getAllreports = async (req: Request, res: Response, next: NextFunction) => {
    try {


      const filter = new FilterDTO(req.query);

      const allData = await this.getAllReportsUsecase.execute(filter);

      res.status(HttpStatusCode.OK).json({ status: true, message: 'user data fetched success', reportsData: allData });
    } catch (error) {
      logger.error('err in reports', { err: error });

      return next(new AppError('err in get all reports', HttpStatusCode.BAD_REQUEST));
    }
  };

  updateReportStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('updated reports data', { data: req.body.update });
      const response = await this.changeRespoStatusUseCase.execute(req.body.update.id, { status: req.body.update.status });

      res.status(HttpStatusCode.OK).json({ status: true, message: 'user data fetched success', reportData: response });
    } catch (error) {
      return next(new AppError('err in update report status', HttpStatusCode.BAD_REQUEST));
    }
  };
}
