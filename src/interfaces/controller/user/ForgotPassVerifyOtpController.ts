import { NextFunction, Request, Response } from 'express';
import { OtpDTO } from '@/application/dto/OtpDTO';

import { IResetPassverifyOtpUseCase } from '@/application/interfaces/use-cases/IUserPasswordUseCases';
import { env } from '@/config/env';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';
import { AppError } from '@/domain/error/AppError';
import { cookieData } from '@/shared/constants/cookieData';

export class ForgotPassVerifyOtpController {
  constructor(
    private resetPassverifyOtpUseCase: IResetPassverifyOtpUseCase,

  ) { }

  verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const otpData = new OtpDTO(req.body);
      const success = await this.resetPassverifyOtpUseCase.execute(otpData);
      const isProduction = env.NODE_ENV === "production"

      if (!success) {
        throw new Error('Session expired.Please request OTP again');
      }
      if (typeof success === 'object') {
        res.cookie('otpAccess', { email: success.email, verifyed: success.verified }, {
          httpOnly: true,
          secure:isProduction,
          sameSite: isProduction ? "none" : "strict",
          maxAge: cookieData.MAX_AGE_OTP,
          domain: isProduction ? env.COOKIE_DOMAIN : undefined,
          path: '/',
        });
      }
      res.json({ status: true, message: 'otp  verified' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(new AppError(error.message, HttpStatusCode.BAD_REQUEST));
      } else {
        next(new AppError('Internal server error', HttpStatusCode.INTERNAL_SERVER_ERROR));
      }
    }
  };
}
