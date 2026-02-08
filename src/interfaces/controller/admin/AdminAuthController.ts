import { NextFunction, Request, Response } from 'express';
import { LoginDTO } from '../../../application/dto/LoginDTO';
import { env } from '../../../config/env';
import { AppError } from '@/shared/error/AppError';
import { ILoginAdminUsecase } from '@/application/interfaces/use-cases/IAdminUseCase';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';
import { ErrorMessages } from '@/shared/constants/ErrorMessages';

export class AdminAuthController {
  constructor(
    private loginAdminUsecase: ILoginAdminUsecase,
  ) { }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginData = new LoginDTO(req.body);
      const adminData = await this.loginAdminUsecase.execute(loginData.identifier, loginData.password);

      const isProduction = env.NODE_ENV === "production"



      res.cookie('accessToken', adminData.accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: isProduction ? "none" : "strict",
        maxAge: 1000 * 60 * 15,
        domain: isProduction ? env.COOKIE_DOMAIN : undefined,

      });
      res.cookie('refreshToken', adminData.refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: isProduction ? "none" : "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        domain: isProduction ? env.COOKIE_DOMAIN : undefined,

      });
      console.log(adminData);
      console.log(adminData.admin);

      res.status(HttpStatusCode.OK).json({ status: true, message: ' logged successfull', admin: adminData.admin });
    } catch (error) {
      console.log(error);
      
      if (error instanceof AppError) {
        next(new AppError(error.message,error.statusCode ?? HttpStatusCode.BAD_REQUEST));
      } else {
        next(new AppError(ErrorMessages.SYSTEM.INTERNAL_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR));
      }
    }
  };


  
  logout = (req: Request, res: Response, next: NextFunction) => {
    try {

      const isProduction = env.NODE_ENV === "production"

      res.clearCookie('accessToken', {
        httpOnly: true,
        sameSite: isProduction ? "none" : "strict",
        secure: process.env.NODE_ENV === 'production',
        domain: isProduction ? env.COOKIE_DOMAIN : undefined,

      });
      res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: isProduction ? "none" : "strict",
        secure: process.env.NODE_ENV === 'production',
        domain: isProduction ? env.COOKIE_DOMAIN : undefined,

      });

      return res.status(HttpStatusCode.OK).json({ message: 'Logged out successfully' });
    } catch (error) {
      next(new AppError(ErrorMessages.SYSTEM.INTERNAL_ERROR, HttpStatusCode.BAD_REQUEST));
    }
  };
}
