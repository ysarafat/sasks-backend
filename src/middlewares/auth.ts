import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import CustomError from '../errors/customError';
import { TUserRole } from '../modules/users/user.interface';
import { User } from '../modules/users/user.model';
import catchAsync from '../utils/catchAsync';

export const auth = (...userRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new CustomError(401, 'Unauthorize request');
    }

    // decoded token
    const decoded = jwt.verify(token, config.jwt_secret!) as JwtPayload;
    req.user = decoded;
    const role = decoded?.role;

    // checking user role
    if (userRoles && !userRoles.includes(role)) {
      throw new CustomError(401, 'Unauthorize request');
    }
    // checking user
    const isUserValid = await User.findOne({ userId: decoded?.userId });
    if (!isUserValid) {
      throw new CustomError(404, 'User not found');
    }
    if (isUserValid?.isDeleted) {
      throw new CustomError(403, "You can't access this resource!");
    }
    if (isUserValid?.status === 'blocked') {
      throw new CustomError(403, 'User is Blocked');
    }

    // old token invalid after password change
    const passwordUpdateAt =
      new Date(isUserValid?.passwordUpdateAt).getTime() / 1000;
    const tokenIssueAt = decoded?.iat;
    if (passwordUpdateAt > tokenIssueAt!) {
      throw new CustomError(401, 'Unauthorize!, Invalid user token');
    }

    next();
  });
};
