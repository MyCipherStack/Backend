import { NextFunction, Request, Response } from 'express';
import { error } from 'console';
import { logger } from '../infrastructure/logger/WinstonLogger/logger';
import { AppError } from '../domain/error/AppError';

export function ErrorHandler(err:Error, req:Request, res:Response, next:NextFunction) {
  console.log(err);

  logger.info('err hanlder called', { err });
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message,
  });
}
