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
    statusCode: 200,
    success: true,
    message: 'User are retrieved successfully',
    data: response,
  });
});

// get single user
const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await UserServices.getSingleUser(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully',
    data: response,
  });
});

// update user
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const response = await UserServices.updateUser(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is updated successfully',
    data: response,
  });
});

// delete user
const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await UserServices.deleteUser(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is deleted successfully',
    data: response,
  });
});

export const UsersController = {
  registerUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
