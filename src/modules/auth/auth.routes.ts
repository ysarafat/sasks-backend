import express from 'express';
import { auth } from '../../middlewares/auth';
import { requestValidation } from '../../middlewares/requestValidation';
import { userRole } from '../users/user.constant';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  requestValidation(AuthValidation.loginSchemaValidation),
  AuthController.login,
);
router.post(
  '/change-password',
  auth(userRole.admin, userRole.superAdmin, userRole.user),
  requestValidation(AuthValidation.changePasswordSchemaValidation),
  AuthController.changePassword,
);

export const AuthRoutes = router;
