import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MemberServices } from './members.services';

// create member
const createMember = catchAsync(async (req, res) => {
  const response = await MemberServices.createMember(req.file, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Member is created successfully',
    data: response,
  });
});

export const MembersController = { createMember };
