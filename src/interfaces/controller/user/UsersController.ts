import { NextFunction, Request, Response } from 'express';
import { IGetFilteredUsersUseCase } from '../../../application/interfaces/use-cases/IGetFilteredUsersUseCase';
import { AppError } from '@/domain/error/AppError';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export class UsersController {
  constructor(
    private getFilteredUsersUseCase: IGetFilteredUsersUseCase,

  ) { }

  getData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const role = req.query.role as string;
      const status = req.query.status as string;
      const search = req.query.search as string;

      const data = await this.getFilteredUsersUseCase.execute({page, limit, role, status, search,});

      


      res.status(HttpStatusCode.OK).json({ status: true, message: 'user data fetched success', usersData: data });
    } catch (error) {
      next(new AppError('create subcription failed', HttpStatusCode.BAD_REQUEST));
    }
  };
}
