import { NextFunction, Request, Response } from 'express';
import { GoogleDto } from '@/application/dto/GoogleUseDto';
import { IGoogleUserUseCase } from '@/application/interfaces/use-cases/IUserUseCase';
import { AppError } from '@/shared/error/AppError';
import { env } from '@/config/env';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { cookieData } from '@/shared/constants/cookieData';

export class GoogleAuthController {
  constructor(

    private googleUserUseCase: IGoogleUserUseCase,

  ) { }

  handleSuccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const googleUser = new GoogleDto(req.user as any);
      
      const { name,email,googleId,image } = googleUser;
   
      const createdUser = await this.googleUserUseCase.execute(name, email, image, googleId);

      res.cookie('accessToken', createdUser.accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge:cookieData.MAX_AGE_ACCESS_TOKEN,
        path: '/',
      });
      res.cookie('refreshToken', createdUser.refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: cookieData.MAX_AGE_REFRESH_TOKEN,
        path: '/',
      });
      res.redirect(`${env.FRONTEND_URL}/Google?name=${encodeURIComponent(createdUser.user.name)}&email=${encodeURIComponent(createdUser.user.email)}&id=${encodeURIComponent(createdUser.user._id?.toString()!)}`);
    } catch (error: unknown) {

      logger.error('Error in GoogleAuthController.handleSuccess:', { error });
    
      if (error instanceof Error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ status: false, message: error.message });
      } else {
        next(new AppError('server error', HttpStatusCode.INTERNAL_SERVER_ERROR));
      }
    }
  };
}
