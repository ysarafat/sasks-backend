import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.services';

// create user
const registerUser = catchAsync(async (req, res) => {
  const response = await UserServices.registerUser(req.file, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User created successfully',
    data: response,
  });
});

// get all user
const getAllUser = catchAsync(async (req, res) => {
  const response = await UserServices.getAllUser(req.query);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User created successfully',
    data: response,
  });
});
export const UsersController = { registerUser, getAllUser };
