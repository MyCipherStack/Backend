import { SubscriptionEntity } from "@/domain/entities/Subscription";
import { BaseRepository } from "./BaseRespositroy";
import {ISubscription, subscripctionModel } from "../database/SubscripctionsModel";
import { Document } from "mongoose";
import { IISubscritpionRepository } from "@/domain/repositories/ISubscritpionRepository";






export class SubscritpionRepository extends BaseRepository<SubscriptionEntity,ISubscription>  implements IISubscritpionRepository{


    constructor(){
        super(subscripctionModel)
    }

    protected toEntity(data: (ISubscription & Document<unknown, any, any>) | null): SubscriptionEntity | null {
        if(!data) return null
        return new SubscriptionEntity(
                data.userId.toString(),
                data.transactionId.toString(),
                data.name,
                data.price,
                data.cycle,
                data.features,
                data.trial,
                data.status
        )
    }
}