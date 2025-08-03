import { NextFunction, Request, Response } from 'express';
import { FilterDTO } from '@/application/dto/FilterDTO';
import { ITransactionUseCase } from '@/application/interfaces/use-cases/IAdminUseCase';
import { AppError } from '@/domain/error/AppError';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export class TransationController {
  constructor(
        private TransactionUseCase: ITransactionUseCase,
  ) {

  }

  allTransations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const page = parseInt(req.query.page as string) || 1;
      // const limit = parseInt(req.query.limit as string) || 10;
      // const status = req.query.status as string;
      const filter = new FilterDTO(req.query);
      const data = await this.TransactionUseCase.execute(filter);

      res.status(HttpStatusCode.OK).json({ status: true, message: 'all transations', transactions: data });
    } catch (error) {
      return next(new AppError('Error in getting all transations', HttpStatusCode.BAD_REQUEST));
    }
  };
}
