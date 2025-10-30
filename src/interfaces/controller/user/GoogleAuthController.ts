import { NextFunction, Request, Response } from 'express';
import { GoogleDto } from '@/application/dto/GoogleUseDto';
import { IGoogleUserUseCase } from '@/application/interfaces/use-cases/IUserUseCase';
import { AppError } from '@/shared/error/AppError';
import { env } from '@/config/env';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { cookieData } from '@/shared/constants/cookieData';
import { ErrorMessages } from '@/shared/constants/ErrorMessages';

export class GoogleAuthController {
  constructor(

    private googleUserUseCase: IGoogleUserUseCase,

  ) { }

  handleSuccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const googleUser = new GoogleDto(req.user as any);
      
      const { name,email,googleId,image } = googleUser;
   
      const createdUser = await this.googleUserUseCase.execute(name, email, image, googleId);


      const isProduction = env.NODE_ENV === "production"

      
      res.cookie('accessToken', createdUser.accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict",
        maxAge: cookieData.MAX_AGE_ACCESS_TOKEN,
        domain: isProduction ? env.COOKIE_DOMAIN : undefined,
        path: '/',
      });
      res.cookie('refreshToken', createdUser.refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict",
        maxAge: cookieData.MAX_AGE_REFRESH_TOKEN,
        domain: isProduction ? env.COOKIE_DOMAIN : undefined,
        path: '/',
      });

      
      res.redirect(`${env.FRONTEND_URL}/Google?name=${encodeURIComponent(createdUser.user.name)}&email=${encodeURIComponent(createdUser.user.email)}&id=${encodeURIComponent(createdUser.user._id?.toString()!)}`);
    } catch (error: unknown) {

      logger.error('Error in GoogleAuthController.handleSuccess:', { error });
    
      if (error instanceof Error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ status: false, message: error.message });
      } else {
        next(new AppError(ErrorMessages.SYSTEM.INTERNAL_ERROR , HttpStatusCode.INTERNAL_SERVER_ERROR));
      }
    }
  };
}
