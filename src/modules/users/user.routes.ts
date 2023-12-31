import express from 'express';
import { auth } from '../../middlewares/auth';
import { multerUpload } from '../../middlewares/multerUpload';
import { parseDataToJson } from '../../middlewares/parseDataToJson';
import { requestValidation } from '../../middlewares/requestValidation';
import { userRole } from './user.constant';
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
router.get('/', auth(userRole.superAdmin), UsersController.getAllUser);
router.get('/:id', UsersController.getSingleUser);
router.patch(
  '/:id',
  requestValidation(UserValidation.updateUserSchemaValidation),
  UsersController.updateUser,
);
router.delete('/:id', UsersController.deleteUser);
export const UserRoutes = router;
