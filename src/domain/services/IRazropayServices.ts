export interface IRazorpayServices{
    createOrder(amount:number, planId:string):Promise<{orderId:string}>

    verifySignature(orderId:string, paymentId:string, signature:string):boolean

    getOrderDetails(orderId:string):Promise<any>
}
