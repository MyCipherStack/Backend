import { NextFunction, Request, Response } from 'express';
import { AppError } from '@/domain/error/AppError';
import { IPaymentUseCases } from '@/application/interfaces/use-cases/IPaymentUseCases';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { PremiumPlan } from '@/domain/entities/PremiumPlan';
import { IGetRepositoryDataUseCase } from '@/application/interfaces/use-cases/IGetRepositoryDataUseCase';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export class PaymentController {
  constructor(
    private paymentUseCases: IPaymentUseCases,
    private getPremiumPlanUseCase: IGetRepositoryDataUseCase<PremiumPlan>,
  ) { }

  createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;
      const planDetails = await this.getPremiumPlanUseCase.OneDocumentById(id);
      logger.info('subscrition eee', { asd: planDetails?._id });

      if (planDetails) {
        const orderDetails = await this.paymentUseCases.createPayment(planDetails?.price, planDetails._id!);

        return res.status(HttpStatusCode.CREATED).json({ status: true, orderId: orderDetails.orderId });
      }
      logger.error('err in subscribe controller');
      throw new AppError('Error on fetching data from database', 400);
    } catch (error) {
      logger.error({ message: 'error', err: error });
      return next(new AppError('Error on subscribe plan', 400));
    }
  };

  verifyPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('verify payment');
      logger.info({ message: 'body', res: req.body.response });
      const user = req.user as { id: string, name: string };

      const data = await this.paymentUseCases.verifyPayment(req.body.response);

      const IsVerifiedSuccess = data.status;
      if (IsVerifiedSuccess) {
        const planDetails = await this.getPremiumPlanUseCase.OneDocumentById(data.planId);

        res.locals.planDetails = planDetails;

        logger.info({ message: 'verifypayment controller', data });
        logger.info({ message: 'verifypayment controller', userName:user.name});

        const updatedDatabase = await this.paymentUseCases.updateNewPayment({
          userId: user.id, orderId: data.orderId, paymentId: data.paymentId, amount: data.amount/100, paymentMethord: 'Razorpay', status: 'success', userName: user.name
        });
        // const orderDetails=await this.paymentUseCases.ge

        res.locals.paymentId = updatedDatabase?._id;
        logger.info('payementid', { updatedDatabase });
        next();
        // res.status(200).json({status:true,message:"payment is verifited success"})
      } else {
        const updatedDatabase = await this.paymentUseCases.updateNewPayment({
          userId: user.id, orderId: data.orderId, paymentId: data.paymentId, amount: data.amount, paymentMethord: 'Razorpay', status: 'failed', userName: user.name
        });
        logger.info('payment failed', { updatedDatabase });

        res.status(HttpStatusCode.BAD_REQUEST).json({ status: true, message: 'payment failed' });
      }
    } catch (error) {
      logger.error({ message: 'failed verification', error });
      return new AppError('payment verification failed', HttpStatusCode.BAD_REQUEST);
    }
  };
}
