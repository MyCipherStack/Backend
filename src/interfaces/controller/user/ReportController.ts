import { NextFunction, Request, Response } from 'express';
import { FilterDTO } from '@/application/dto/FilterDTO';
import { CreateReportDTO } from '@/application/dto/ReportDTO';
import { ICreateRepoUseCase } from '@/application/interfaces/use-cases/ICreateRepoUseCase';
import { IGetAllReportsUsecase } from '@/application/interfaces/use-cases/IReportUseCase';
import { IGetUserDataBynameUseCase } from '@/application/interfaces/use-cases/IUserUseCase';
import { Report } from '@/domain/entities/Report';
import { AppError } from '@/domain/error/AppError';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export class ReportController {
  constructor(
    private createReportUseCase: ICreateRepoUseCase<Report>,
    private getUserDataBynameUseCase: IGetUserDataBynameUseCase,
  ) { }

  createReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // gettin id from username to store reported ID
      const reportedUserData = await this.getUserDataBynameUseCase.exectue(req.body.report.reportedUser);

      // It's application orchestration. not business rules

      const forDto = req.body.report;

      const user = req.user as { id: string };

      forDto.reportedUser = reportedUserData?._id;
      forDto.submittedBy = user.id;

      const data = new CreateReportDTO(forDto);

      logger.info('create report', { data });
      const reportData = await this.createReportUseCase.execute(data);

      res.status(HttpStatusCode.CREATED).json({ status: true, createdData: reportData });
    } catch (error) {
      console.log(error);

      logger.error(error);
      return next(new AppError('error in create report', 400));
    }
  };
}
