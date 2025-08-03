import { NextFunction, Request, Response } from 'express';
import { AppError } from '@/domain/error/AppError';

export class RoleMiddleware {
  requireRole(roles:string[]) {
    return (req:Request, res:Response, next:NextFunction) => {
      const { user } = req;
      if (!user) {
        next(new AppError('Not authenticated', 401));
      }
      if (!roles.includes(user?.role!)) {
        next(new AppError('Access denied: insufficient permission', 403));
      }
      next();
    };
  }
}
