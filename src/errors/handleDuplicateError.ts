import { TErrorResponse } from '../interface/errorResponse';

export const handleDuplicateError = (error: any): TErrorResponse => {
  const match = error.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  return {
    statusCode: 400,
    message: `${extractedMessage} is already exist`,
    error: error,
  };
};
