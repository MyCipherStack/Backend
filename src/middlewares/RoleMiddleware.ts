import { NextFunction, Request, Response } from 'express';
import { AppError } from '@/domain/error/AppError';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';


export class RoleMiddleware {
  requireRole(roles:string[]) {
    return (req:Request, res:Response, next:NextFunction) => {
      const { user } = req;
      if (!user) {
        next(new AppError('Not authenticated', HttpStatusCode.UNAUTHORIZED));
      }
      if (!roles.includes(user?.role!)) {
        next(new AppError('Access denied: insufficient permission',HttpStatusCode.FORBIDDEN));
      }
      next();
    };
  }
}
