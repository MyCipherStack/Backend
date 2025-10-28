import { Request, Response } from 'express';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';
import { env } from '@/config/env';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';






export class LogoutController {

  logout = (req: Request, res: Response): Response => {
    try {
      const isProduction = env.NODE_ENV === "production"


      const cookieOptions = {
        httpOnly: true,
        sameSite: isProduction ? "none" : "strict" as "none" |  "strict",
        secure: isProduction,
        domain: isProduction ? env.COOKIE_DOMAIN : undefined,
        path: "/"
      }

      res.clearCookie('accessToken', cookieOptions);
      res.clearCookie('refreshToken', cookieOptions);
      
      return res.status(HttpStatusCode.OK).json({ message: 'Logged out successfully' });
    } catch (error) {
      logger.error('Error during logout:', { error });
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }

}
