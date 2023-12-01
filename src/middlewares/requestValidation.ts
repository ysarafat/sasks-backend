import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import AppError from '../errors/appError';

export const requestValidation = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const zodErrors = error.errors.map((err) => {
          return { message: err.path[0] + ' is ' + err.message };
        });
        const { message } = zodErrors[0];
        next(new AppError(400, message));
      }
    }
  };
};
