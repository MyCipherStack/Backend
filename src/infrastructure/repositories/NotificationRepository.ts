import { Document } from 'mongoose';
import { NotificationEntity } from '@/domain/entities/Notification';
import { BaseRepository } from './BaseRepository';
import { INotification, notificationModel } from '../database/NotificationModel';
import { INotificationRepository } from '@/domain/repositories/INotificationRepository';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';

export class NotificationRepository extends BaseRepository<NotificationEntity, INotification> implements INotificationRepository {
  constructor() {
    super(notificationModel);
  }

  protected toEntity(data: (INotification & Document) | null): NotificationEntity | null {
    if (!data) return null;

    return new NotificationEntity(
      data.userId,
      data.title,
      data.message,
      data.isRead,
      data.createdAt,
      data.link,
      data.id,
    );
  }
}
