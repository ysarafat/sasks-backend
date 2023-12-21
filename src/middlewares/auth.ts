import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import CustomError from '../errors/customError';
import { TUserRole } from '../modules/users/user.interface';
import catchAsync from '../utils/catchAsync';

export const auth = (...userRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new CustomError(401, 'Unauthorize request');
    }
    // decoded token
    const decoded = jwt.verify(token, config.jwt_secret!);
    req.user = decoded as JwtPayload;
    const role = (decoded as JwtPayload)?.role;
    // checking user role
    if (userRoles && !userRoles.includes(role)) {
      throw new CustomError(401, 'Unauthorize request');
    }
    next();
  });
};
