import { NextFunction, Request, Response } from 'express';
import { UpdateUserDTO } from '@/application/dto/UpdateUserDTO';
import { IGetFilteredUsersUseCase } from '@/application/interfaces/use-cases/IGetFilteredUsersUseCase';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { AppError } from '@/domain/error/AppError';
import { IUpdateUserUseCase } from '@/application/interfaces/use-cases/IUserUseCase';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export class UsersListController {
  constructor(
    private getFilteredUsersUseCase: IGetFilteredUsersUseCase,
    private updateUserUseCase: IUpdateUserUseCase,

  ) { }

  getData = async (req: Request, res: Response, next:NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const role = req.query.role as string;
      const status = req.query.status as string;
      const search = req.query.search as string;

      const data = await this.getFilteredUsersUseCase.execute({
        page, limit, role, status, search,
      });

   

      res.status(HttpStatusCode.OK).json({ status: true, message: 'user data fetched success', usersData: data });
    } catch (error) {
      return next(new AppError('Internal server error', HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {


      const updateData = new UpdateUserDTO(req.body);
    


      const updatedUser = await this.updateUserUseCase.execute(updateData.email!, updateData);

      if (!updatedUser) {
        return next(new AppError('User not found', HttpStatusCode.NOT_FOUND));
      }

      res.status(HttpStatusCode.OK).json({ status: true, message: 'User updated', user: updatedUser });
    } catch (err) {
      logger.error(err);

      return next(new AppError('Internal server error', HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  };
}
