
import { Transaction } from '../../../domain/entities/Transaction';

export interface IPaymentUseCases{
    createOrder(amount:number, planId:string,userId:string):Promise<{orderId:string}>

    verifyPayment(response:any):Promise< {status:boolean, orderId:string, paymentId:string, amount:number, planId:string}>

    updateNewPayment(data:Transaction):Promise<Transaction | null>
}
