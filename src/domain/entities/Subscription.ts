


export class SubscriptionEntity {

    constructor(
        public userId: string,

        public transactionId: string,

        public name: string,

        public price: number,

        public cycle: string,

        public features: [{ text: String, enabled: Boolean }],

        public trial: number,

        public status: string

    ) { }
}