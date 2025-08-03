import { NextFunction, Request, Response } from 'express';
import { ISendOtpUseCase } from '@/application/interfaces/use-cases/IOtpUseCases';
import { AppError } from '@/domain/error/AppError';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export class ResendOtpController {
  constructor(

        private sendOtpUseCase: ISendOtpUseCase,

  ) {

  }

  resend = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('resend in backend');

      // const data= new OtpDTO(req.body);
      const data = req.body;

      await this.sendOtpUseCase.execute(data.email);
      res.status(HttpStatusCode.OK).json({ status: true, message: 'OTP sented' });
    } catch (error: any) {
      next(new AppError(error.message, 500));
    }
  };
}
