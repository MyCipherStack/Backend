


export class Transaction{
    constructor(
         
        public userId:string,
        
        public amount:number,

        public paymentMethord:string,

        public paymentId:string,

        public orderId:string,

        public status:string,

        public _id?:string
    ){}
}