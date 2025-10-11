import { NextFunction, Request, Response } from 'express';
import { logger } from '../infrastructure/logger/WinstonLogger/logger';
import { AppError } from '../domain/error/AppError';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export function ErrorHandler(err:Error, req:Request, res:Response, next:NextFunction) {

  logger.info('err hanlder middleware called', { err });
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message, 
    });
  }

  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message,
  });
}
