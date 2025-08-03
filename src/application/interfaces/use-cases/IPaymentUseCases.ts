import { ITransaction } from '@/infrastructure/database/TransactionsModel';
import { Transaction } from '../../../domain/entities/Transaction';

export interface IPaymentUseCases{
    createPayment(amount:number, planId:string):Promise<{orderId:string}>

    verifyPayment(response:any):Promise< {status:boolean, orderId:string, paymentId:string, amount:number, planId:string}>

    updateNewPayment(data:Transaction):Promise<Transaction | null>
}
