import { IRazorpayServices } from '@/domain/services/IRazropayServices';
import { IPaymentUseCases } from '../../interfaces/use-cases/IPaymentUseCases';
import { verifyPaymentDTO } from '../../dto/VerifyPaymentDTO';
import { ITransactionRepotitory } from '@/domain/repositories/ITransactionRepotitory';
import { Transaction } from '@/domain/entities/Transaction';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';

export class PaymentUseCases implements IPaymentUseCases {
  constructor(
    private razorpayServices:IRazorpayServices,
    private transactionRepo:ITransactionRepotitory,
  ) {}

  async createPayment(amount: number, planId:string): Promise<{ orderId: string }> {
    const data = await this.razorpayServices.createOrder(amount, planId);
    return data;
  }

  verifyPayment = async (response:any): Promise<{status:boolean, orderId:string, paymentId:string, amount:number, planId:string}> => {
    const data = new verifyPaymentDTO(response);
    const res = this.razorpayServices.verifySignature(data.orderId, data.paymentId, data.signature);

    const orderDetails = await this.razorpayServices.getOrderDetails(data.orderId);

    logger.info({ message: 'in paymet uescase', info: orderDetails });

    return {
      status: res, orderId: data.orderId, paymentId: data.paymentId, amount: orderDetails.amount, planId: orderDetails.notes.planId,
    };
  };

  updateNewPayment = async (data:Transaction): Promise<Transaction |null> => {
    const res = this.transactionRepo.create(data);
    return res;
  };
}
