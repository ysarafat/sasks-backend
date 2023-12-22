import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.services';

// user login
const login = catchAsync(async (req, res) => {
  const response = await AuthService.login(req.body);
  const { refreshToken, accessToken, needPasswordChange } = response;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logged in successfully',
    data: {
      accessToken,
      needPasswordChange,
    },
  });
});

// change password
const changePassword = catchAsync(async (req, res) => {
  const response = await AuthService.changePassword(req.user, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully',
    data: response,
  });
});

// change password
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const response = await AuthService.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logged in successfully',
    data: response,
  });
});

export const AuthController = { login, changePassword, refreshToken };
