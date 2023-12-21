import { z } from 'zod';

const loginSchemaValidation = z.object({
  userId: z.string(),
  password: z.string(),
});

const changePasswordSchemaValidation = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
});
export const AuthValidation = {
  loginSchemaValidation,
  changePasswordSchemaValidation,
};
