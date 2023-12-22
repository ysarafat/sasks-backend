import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import CustomError from '../../errors/customError';
import { User } from '../users/user.model';
import { TAuth } from './auth.interface';
import { createToken } from './auth.utils';
// user login
const login = async (payload: TAuth) => {
  // checking user
  const isUserExist = await User.findOne({ userId: payload?.userId }).select(
    '+password',
  );
  if (!isUserExist) {
    throw new CustomError(404, 'User not found');
  }
  if (isUserExist?.isDeleted) {
    throw new CustomError(403, 'User is Deleted');
  }
  if (isUserExist?.status === 'blocked') {
    throw new CustomError(403, 'User is Blocked');
  }

  // checking password
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExist?.password,
  );

  if (!isPasswordMatched) {
    throw new CustomError(401, 'Password is incorrect');
  }

  const jwtPayload = {
    userId: isUserExist?.userId,
    role: isUserExist?.role,
  };
  //   send access token and refresh token
  const accessToken = createToken(jwtPayload, config.jwt_secret!, '1h');
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret!,
    '120d',
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: isUserExist?.needPasswordChange,
  };
};

// change password
const changePassword = async (
  user: JwtPayload,
  payload: {
    currentPassword: string;
    newPassword: string;
  },
) => {
  const isUserExist = await User.findOne({ userId: user?.userId }).select(
    '+password',
  );
  // checking password
  const isPasswordMatched = await bcrypt.compare(
    payload?.currentPassword,
    isUserExist?.password as string,
  );
  if (!isPasswordMatched) {
    throw new CustomError(401, 'Password is incorrect');
  }

  // hash new password
  const hashPassword = await bcrypt.hash(payload?.newPassword as string, 16);

  await User.findOneAndUpdate(
    { userId: user?.userId },
    {
      password: hashPassword,
      needPasswordChange: false,
      passwordUpdateAt: new Date(),
    },
  );

  return null;
};

// refresh token
const refreshToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new CustomError(401, 'Unauthorize request');
  }

  // decoded refreshToken
  const decoded = jwt.verify(
    refreshToken,
    config.jwt_refresh_secret!,
  ) as JwtPayload;

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

  // create access token
  const jwtPayload = {
    userId: isUserValid?.userId,
    role: isUserValid?.role,
  };

  //   send access token and refresh token
  const accessToken = createToken(jwtPayload, config.jwt_secret!, '1h');

  return {
    accessToken,
  };
};
export const AuthService = { login, changePassword, refreshToken };
