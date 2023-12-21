import express from 'express';
import { multerUpload } from '../../middlewares/multerUpload';
import { parseDataToJson } from '../../middlewares/parseDataToJson';
import { requestValidation } from '../../middlewares/requestValidation';
import { MembersController } from './members.controller';
import { MemberValidation } from './members.validation';
const router = express.Router();

const acceptUploadFile = ['image/jpg', 'image/jpeg', 'image/png'];

router.post(
  '/create',
  multerUpload(5, acceptUploadFile).single('image'),
  parseDataToJson,
  requestValidation(MemberValidation.membersValidationSchema),
  MembersController.createMember,
);
export const MembersRoutes = router;
