import { NextFunction, Request, Response } from 'express';
import { IJwtService } from '../domain/services/IJwtService';
import { env } from '@/config/env';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { IGetRepositoryDataUseCase } from '@/application/interfaces/use-cases/IGetRepositoryDataUseCase';
import { AppError } from '@/domain/error/AppError';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';
import { cookieData } from '@/shared/constants/cookieData';

interface IRepoData {
  status: string, email: string, name: string, _id: string
}

// ADMIN AND USER HAVE SAME Authenticate CONTROLLER (

export class Authenticate<Entity> {
  constructor(
    private jwtService: IJwtService,
    private getRepositoryDataUseCase: IGetRepositoryDataUseCase<Entity>,
  ) { }

  verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('validating user');

      const { accessToken } = req.cookies;
      const { refreshToken } = req.cookies;

      if (!accessToken && !refreshToken) {
        logger.error('no refresh access token');

        return res.status(HttpStatusCode.UNAUTHORIZED).json({ status: false, message: 'login  expired' });
      }

      if (accessToken) {
        logger.info('access token found');

        const tokenData = await this.jwtService.verifyAccessToken(accessToken);
        logger.info('TokenDAsat', tokenData);
    
        if (tokenData) {
          const foundUser = await this.getRepositoryDataUseCase.OneDocumentById(tokenData.userId) as IRepoData;

          logger.info('access token valid');

          const isProduction = env.NODE_ENV === "production"

          if (foundUser?.status && foundUser?.status === 'banned') {
            logger.info('user blocked');

            res.clearCookie('accessToken', {
              httpOnly: true,
              sameSite: isProduction ? "none" : "strict",
              secure: isProduction,
              domain: isProduction ? env.COOKIE_DOMAIN : undefined,

            });

            res.clearCookie('refreshToken', {
              httpOnly: true,
              sameSite: isProduction ? "none" : "strict",
              secure: isProduction,
              domain: isProduction ? env.COOKIE_DOMAIN : undefined,
            });

            return res.status(HttpStatusCode.UNAUTHORIZED).json({ status: false, message: 'This Account is banned' });
          }
          if (foundUser) {
            req.user = {
              role: tokenData.role, email: foundUser.email, name: foundUser.name, id: foundUser._id,
            }; // i can use other router

            return next();
          }


          res.clearCookie('accessToken', {
            httpOnly: true,
            sameSite: isProduction ? "none" : "strict",
            secure: isProduction,
            domain: isProduction ? env.COOKIE_DOMAIN : undefined,

          });

          res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: isProduction ? "none" : "strict",
            secure: isProduction,
            domain: isProduction ? env.COOKIE_DOMAIN : undefined,

          });
          return next(new AppError('user not found: Unauthorized ', HttpStatusCode.UNAUTHORIZED));
        }
      }
      if (refreshToken) {
        console.log('refreshToken found');
        const userPayload = this.jwtService.verifyRefreshToken(refreshToken);
        const { exp, iat, ...payload } = userPayload;
        if (userPayload) {
          const createAccesstoken = this.jwtService.signAccessToken(payload);

          const isProduction = env.NODE_ENV === "production"

          res.cookie('accessToken', createAccesstoken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "strict",
            maxAge:cookieData.MAX_AGE_ACCESS_TOKEN,
            domain: isProduction ? env.COOKIE_DOMAIN : undefined,
          });
          const foundUser = await this.getRepositoryDataUseCase.OneDocumentById(userPayload.userId) as IRepoData;

          if (foundUser) {
            req.user = {
              role: payload.role, email: foundUser.email, name: foundUser.name, id: foundUser._id,
            }; // i can use other routesn

            return next();
          }

          return next(new AppError('user not found',HttpStatusCode.NOT_FOUND));
        }
      }
    } catch (error) {
      logger.error('err in auth middelware', error);

      return res.status(HttpStatusCode.UNAUTHORIZED).json({ status: false, message: 'No token' });
    }
  };
}
