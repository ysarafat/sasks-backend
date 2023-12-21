import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const requestValidation = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      next(error);
    }
  };
};
