import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.services';

// user login
const login = catchAsync(async (req, res) => {
  const response = await AuthService.login(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logged in successfully',
    data: response,
  });
});

// change password
const changePassword = catchAsync(async (req, res) => {
  const response = await AuthService.changePassword(req.user, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logged in successfully',
    data: response,
  });
});

export const AuthController = { login, changePassword };
