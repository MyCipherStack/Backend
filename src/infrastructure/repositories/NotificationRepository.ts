import { NotificationEntity } from "@/domain/entities/Notification";
import { BaseRepository } from "./BaseRespositroy";
import { INotification, notificationModel } from "../database/NotificationModel";
import { Document } from "mongoose";
import { INotificationRepository } from "@/domain/repositories/INotificationRepository";
import { logger } from "@/logger";




export class NotificationRepository extends BaseRepository<NotificationEntity, INotification> implements INotificationRepository {

    constructor() {
        super(notificationModel)
    }


    




    protected toEntity(data: (INotification & Document<unknown, any, any>) | null): NotificationEntity | null {
        if (!data) return null
                
        return new NotificationEntity(
            data.userId,
            data.title,
            data.message,
            data.isRead,
            data.createdAt,
            data.link,
            data.id
        )


    }

}