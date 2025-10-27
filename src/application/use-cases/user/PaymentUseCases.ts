import { IRazorpayServices } from '@/domain/services/IRazropayServices';
import { IPaymentUseCases } from '@/application/interfaces/use-cases/IPaymentUseCases';
import { verifyPaymentDTO } from '@/application/dto/VerifyPaymentDTO';
import { ITransactionRepository } from '@/domain/repositories/ITransactionRepository';
import { Transaction } from '@/domain/entities/Transaction';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { RedisKeys } from '@/shared/constants/RedisKeys';
import { IRedisServices } from '@/domain/services/IRedisServices';
import { AppError } from '@/shared/error/AppError';

export class PaymentUseCases implements IPaymentUseCases {
  constructor(
    private razorpayServices: IRazorpayServices,
    private transactionRepo: ITransactionRepository,
    private redisServices: IRedisServices

  ) { }



  async createOrder(amount: number, planId: string, userId: string): Promise<{ orderId: string }> {



    const value = await this.redisServices.get(RedisKeys.paymentLock(userId))
    if (value) {
      throw new AppError("payment already started")
    } else {

      const value = await this.redisServices.set(RedisKeys.paymentLock(userId), "locked", 120)


      const data = await this.razorpayServices.createOrder(amount, planId);

      return data;

    }



  }


  verifyPayment = async (response: any): Promise<{ status: boolean, orderId: string, paymentId: string, amount: number, planId: string }> => {
    const data = new verifyPaymentDTO(response);
    const res = this.razorpayServices.verifySignature(data.orderId, data.paymentId, data.signature);

    const orderDetails = await this.razorpayServices.getOrderDetails(data.orderId);

    logger.info({ message: 'in paymet uescase', info: orderDetails });

    return {
      status: res, orderId: data.orderId, paymentId: data.paymentId, amount: orderDetails.amount, planId: orderDetails.notes.planId,
    };
  };



  updateNewPayment = async (data: Transaction): Promise<Transaction | null> => {
    const res = this.transactionRepo.create(data);

    this.redisServices.del(data.userId)

    return res;
  };
}
