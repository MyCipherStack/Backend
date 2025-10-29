import { NextFunction, Request, Response } from 'express';
import { CreateUserDTO } from '@/application/dto/CreateUserDTO';
import { LoginDTO } from '@/application/dto/LoginDTO';
import { env } from '@/config/env';
import { ICreateUserUseCase, ILoginUserUseCase } from '@/application/interfaces/use-cases/IUserUseCase';
import { AppError } from '@/shared/error/AppError';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { ISendOtpUseCase } from '@/application/interfaces/use-cases/IOtpUseCases';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';
import { cookieData } from '@/shared/constants/cookieData';
import { ErrorMessages } from '@/shared/constants/ErrorMessages';



export class AuthController {
  constructor(
    private createUserUseCase: ICreateUserUseCase,
    private sentOtpUsecase: ISendOtpUseCase,
    private loginUserUseCase: ILoginUserUseCase,

  ) { }



  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = new CreateUserDTO(req.body);


      const createdUserEmail = await this.createUserUseCase.execute(userData.name, userData.email, userData.password);

      if (createdUserEmail) {
        await this.sentOtpUsecase.execute(createdUserEmail);

        res.status(HttpStatusCode.CREATED).json({ status: true, message: 'OTP sented' });
      } else {
        next(new AppError('Something wentwrong', HttpStatusCode.BAD_REQUEST));
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(error.message, 'backend error in auth controller');

        next(new AppError(error.message, HttpStatusCode.BAD_REQUEST));
      } else {
        next(new AppError(ErrorMessages.SYSTEM.INTERNAL_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR));
      }
    }
  };



  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginData = new LoginDTO(req.body);
      const loginUserData = await this.loginUserUseCase.execute(loginData.identifier, loginData.password);


      const isProduction = env.NODE_ENV === "production"


      res.cookie('accessToken', loginUserData.accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict",
        maxAge: cookieData.MAX_AGE_ACCESS_TOKEN,
        domain: isProduction ? env.COOKIE_DOMAIN : undefined,
        path: '/',
      });
      res.cookie('refreshToken', loginUserData.refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict",
        maxAge: cookieData.MAX_AGE_REFRESH_TOKEN,
        domain: isProduction ? env.COOKIE_DOMAIN : undefined,
        path: '/',
      });

      res.status(HttpStatusCode.OK).json({ status: true, message: 'user logged success', user: loginUserData.user });
    } catch (error: any) {
      logger.error(error.message);
      next(new AppError(error.message, HttpStatusCode.BAD_REQUEST));
    }
  };
}
