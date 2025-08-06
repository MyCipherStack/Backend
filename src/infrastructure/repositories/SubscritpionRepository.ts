import { Document } from 'mongoose';
import { SubscriptionEntity } from '@/domain/entities/Subscription';
import { BaseRepository } from './BaseRepository';

import { ISubscription, subscriptionModel } from '../database/SubscriptionsModel';
import { ISubscriptionRepository } from '@/domain/repositories/ISubscriptionRepository';

export class SubscriptionRepository extends BaseRepository<SubscriptionEntity, ISubscription> implements ISubscriptionRepository {
  constructor() {
    super(subscriptionModel);
  }

  protected toEntity(data: (ISubscription & Document) | null): SubscriptionEntity | null {
    if (!data) return null;
    return new SubscriptionEntity(
      data.userId.toString(),
      data.transactionId.toString(),
      data.name,
      data.price,
      data.cycle,
      data.features,
      data.trial,
      data.status,
      data.planId,
      data.createdAt,
      data.endDate,
      data._id,
    );
  }
}
