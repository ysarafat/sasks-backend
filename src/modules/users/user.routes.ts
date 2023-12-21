import express from 'express';
import { multerUpload } from '../../middlewares/multerUpload';
import { parseDataToJson } from '../../middlewares/parseDataToJson';
import { requestValidation } from '../../middlewares/requestValidation';
import { UsersController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

const acceptUploadFile = ['image/jpg', 'image/jpeg', 'image/png'];

router.post(
  '/register',
  multerUpload(5, acceptUploadFile).single('image'),
  parseDataToJson,
  requestValidation(UserValidation.userSchemaValidation),
  UsersController.registerUser,
);
router.get('/', UsersController.getAllUser);

export const UserRoutes = router;
