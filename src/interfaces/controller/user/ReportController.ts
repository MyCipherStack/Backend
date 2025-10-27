import { NextFunction, Request, Response } from 'express';
import { FilterDTO } from '@/application/dto/FilterDTO';
import { CreateReportDTO } from '@/application/dto/ReportDTO';
import { ICreateRepoUseCase } from '@/application/interfaces/use-cases/ICreateRepoUseCase';
import { IGetAllReportsUsecase } from '@/application/interfaces/use-cases/IReportUseCase';
import { IGetUserDataByNameUseCase } from '@/application/interfaces/use-cases/IUserUseCase';
import { Report } from '@/domain/entities/Report';
import { AppError } from '@/shared/error/AppError';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export class ReportController {
  constructor(
    private createReportUseCase: ICreateRepoUseCase<Report>,
    private getUserDataByNameUseCase: IGetUserDataByNameUseCase,
  ) { }

  createReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
     
      const reportedUserData = await this.getUserDataByNameUseCase.execute(req.body.report.reportedUser);

      // It's application orchestration. not business rules

      const report = req.body.report;
      const user = req.user as { id: string };
      report.reportedUser = reportedUserData?._id;
      report.submittedBy = user.id;
      const data = new CreateReportDTO(report);

      logger.info('create report', { data });
      const reportData = await this.createReportUseCase.execute(data);

      res.status(HttpStatusCode.CREATED).json({ status: true, createdData: reportData });
    } catch (error) {
     
      logger.error(error);
      return next(new AppError('error in create report', 400));
    }
  };
}
