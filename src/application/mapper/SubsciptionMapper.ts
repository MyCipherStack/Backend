





import { SubscriptionEntity } from "@/domain/entities/Subscription";
import { User } from "@/domain/entities/User";



export class SubsciptionMapper {


    static toResponseDTO(subscription: SubscriptionEntity) {

        return {
            userId: subscription.userId,

            transactionId: subscription.transactionId,

            name: subscription.name,

            price: subscription.price,

            cycle: subscription.cycle,

            features: subscription.features,

            trial: subscription.trial,

            status: subscription.status,

            planId: subscription.planId,

            createdAt: subscription.createdAt,

            endDate: subscription.endDate,

            _id: subscription._id,
        }


    }
}