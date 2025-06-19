
export class verifyPaymentDTO{
    
    orderId:string
    paymentId:string
    signature:string

    constructor(data:{
        razorpay_order_id:string,razorpay_payment_id: string,razorpay_signature: string
    }){
        this.orderId=data.razorpay_order_id,
        this.paymentId=data.razorpay_payment_id
        this.signature=data.razorpay_signature


        }


}