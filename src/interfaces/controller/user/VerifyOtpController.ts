import { NextFunction, Request, Response } from 'express';
import { OtpDTO } from '../../../application/dto/OtpDTO';
import { IVerifyOtpUseCase } from '@/application/interfaces/use-cases/IOtpUseCases';
import { IRegisterUserFromPendingUseCase } from '@/application/interfaces/use-cases/IUserUseCase';
import { AppError } from '@/domain/error/AppError';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export class VerifyOtpController {
  constructor(
    private verifyOtpUseCase: IVerifyOtpUseCase,
    private registerUserFromPendingUseCase: IRegisterUserFromPendingUseCase,
  ) { }

  verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
     
      const data = new OtpDTO(req.body);

      const isValid = await this.verifyOtpUseCase.execute(data.email, data.otp);

      if (!isValid) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ status: false, message: 'Invalid or expired OTP' });
      }

      const userData = await this.registerUserFromPendingUseCase.execute(data.email);

      res.json({ status: true, message: 'user created Successfully', user: { name: userData?.name, email: userData?.email } });
    } catch (error: any) {
      next(new AppError(error.message, HttpStatusCode.INTERNAL_SERVER_ERROR));

   
    }
  };
}
