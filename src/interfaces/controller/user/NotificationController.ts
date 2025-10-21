import { NextFunction, Request, Response } from 'express';
import { IGetAllRepoDataUsingFieldUseCase, IUpdateRepositoryDataUseCase } from '@/application/interfaces/use-cases/ISharedUseCase';
import { NotificationEntity } from '@/domain/entities/Notification';
import { AppError } from '@/domain/error/AppError';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export class NotificationController {
  constructor(
        private updateRepositoryDataUseCase: IUpdateRepositoryDataUseCase<NotificationEntity>,
        private getAllNotificaionDataUsingFieldUseCase: IGetAllRepoDataUsingFieldUseCase<NotificationEntity>,

  ) { }

  userAllNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as { id: 'string' };

      const allNotification = await this.getAllNotificaionDataUsingFieldUseCase.execute({ userId: user.id });

      res.status(HttpStatusCode.OK).json({ status: true, message: 'problem submitted', allNotification });
    } catch (error) {

      return next(new AppError('server error', 500));
    }
  };


  readNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notificationId = req.body.id;
      logger.info('readnotification ---- id', { notificationId });

      const notification = await this.updateRepositoryDataUseCase.execute(notificationId, { isRead: true });

      res.status(HttpStatusCode.OK).json({ status: true, message: 'problem submitted', notification });
    } catch (error) {
      return next(new AppError('server error', HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
  };
}
