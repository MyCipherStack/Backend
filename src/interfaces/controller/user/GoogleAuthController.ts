import { NextFunction, Request, Response } from 'express';
import { GoogleDto } from '@/application/dto/GoogleUseDto';
import { IGoogleUserUseCase } from '@/application/interfaces/use-cases/IUserUseCase';
import { AppError } from '@/domain/error/AppError';
import { env } from '@/config/env';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export class GoogleAuthController {
  constructor(

        private googleUserUseCase: IGoogleUserUseCase,

  ) { }

  handleSuccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const googleUser = new GoogleDto(req.user as any);
      const { name } = googleUser;
      const { email } = googleUser;
      const { googleId } = googleUser;
      const { image } = googleUser;

      const createdUser = await this.googleUserUseCase.execute(name, email, image, googleId);

      res.cookie('accessToken', createdUser.accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 15,
        path: '/',
      });
      res.cookie('refreshToken', createdUser.refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: '/',
      });
      res.redirect(`${env.GOOGLE_URL}/Google?name=${encodeURIComponent(createdUser.user.name)}&email=${encodeURIComponent(createdUser.user.email)}&id=${encodeURIComponent(createdUser.user._id?.toString()!)}`);
    } catch (error: any) {
      next(new AppError(error.messag, HttpStatusCode.BAD_REQUEST));
    }
  };
}
