import express from 'express';
import { requestValidation } from '../../middlewares/requestValidation';
import { MembersController } from './members.controller';
import { membersValidationSchema } from './members.validation';
const router = express.Router();

router.post(
  '/create',
  requestValidation(membersValidationSchema),
  MembersController.createMember,
);
export const MembersRoutes = router;
