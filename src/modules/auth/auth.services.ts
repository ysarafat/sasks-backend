import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import CustomError from '../../errors/customError';
import { User } from '../users/user.model';
import { TAuth } from './auth.interface';
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
  const accessToken = jwt.sign(jwtPayload, config.jwt_secret!, {
    expiresIn: '1d',
  });
  return {
    accessToken,
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
    { password: hashPassword },
  );

  return null;
};
export const AuthService = { login, changePassword };
