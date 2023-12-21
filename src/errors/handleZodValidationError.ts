import { ZodError } from 'zod';
import { TErrorResponse } from '../interface/errorResponse';

export const handleZodValidationError = (
  unhandledError: ZodError,
): TErrorResponse => {
  const errorMessage = unhandledError.errors
    .map((err) => {
      return err?.path[err?.path?.length - 1] + ' is ' + err?.message;
    })
    .join(', ');

  return {
    statusCode: 400,
    message: errorMessage,
    error: unhandledError,
  };
};
