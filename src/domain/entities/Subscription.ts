export class SubscriptionEntity {
  constructor(
        public userId: string,

        public transactionId: string,

        public name: string,

        public price: number,

        public cycle: string,

        public features: { text: string, enabled: boolean }[],

        public trial: number,

        public status: string,

        public planId:string,

        public createdAt:Date,

        public endDate:Date,

        public _id:string,

  ) { }
}
