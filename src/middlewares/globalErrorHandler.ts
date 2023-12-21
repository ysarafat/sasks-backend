/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import { handleDuplicateError } from '../errors/handleDuplicateError';
import { handleZodValidationError } from '../errors/handleZodValidationError';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let error;
  // handle errors
  if (err instanceof ZodError) {
    const handleError = handleZodValidationError(err);
    statusCode = handleError.statusCode;
    message = handleError.message;
    error = handleError.error;
  } else if (err?.code === 11000) {
    const handleError = handleDuplicateError(err);
    statusCode = handleError.statusCode;
    message = handleError.message;
    error = handleError.error;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
    stack: config.NODE_ENV === 'development' ? err?.stack : '',
  });
};
