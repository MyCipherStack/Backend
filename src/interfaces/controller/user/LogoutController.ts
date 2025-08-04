import { Request, Response } from 'express';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';
import { env } from '@/config/env';






export class LogoutController {
  logout = (req: Request, res: Response): Response => {
    console.log('logout controller is working');

    const isProduction = env.NODE_ENV === "production"
    
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: isProduction ? "none" : "strict",
      secure: isProduction,
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: isProduction ? "none" : "strict",
      secure: isProduction,
    });
    return res.status(HttpStatusCode.OK).json({ message: 'Logged out successfully' });
  };
}
