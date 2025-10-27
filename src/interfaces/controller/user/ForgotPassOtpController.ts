import { NextFunction, Request, Response } from 'express';
import { env } from '@/config/env';
import { IResetPasswordOtpUseCase } from '@/application/interfaces/use-cases/IUserPasswordUseCases';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';
import { AppError } from '@/shared/error/AppError';
import { cookieData } from '@/shared/constants/cookieData';

export class ForgotPasswordOtpController {
  constructor(
        private resetPassswordOtpUseCase: IResetPasswordOtpUseCase,
  ) { }

  sendOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const otpData = req.body;
      console.log(otpData.email, 'fogotpassword email');

      const otpToken = await this.resetPassswordOtpUseCase.execute(otpData.email);

      console.log(otpToken, 'setting token otp');

      res.cookie('otpAccess', otpToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: cookieData.MAX_AGE_OTP,
        path: '/',
      });

      res.status(HttpStatusCode.OK).json({ status: true, message: 'otp sented' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(new AppError(error.message, HttpStatusCode.BAD_REQUEST));
      } else {
        next(new AppError('Internal server error', HttpStatusCode.INTERNAL_SERVER_ERROR));
      }
    }
  };
}
