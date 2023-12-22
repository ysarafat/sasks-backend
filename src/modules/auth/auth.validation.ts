import { z } from 'zod';

const loginSchemaValidation = z.object({
  body: z.object({
    userId: z.string(),
    password: z.string(),
  }),
});

const changePasswordSchemaValidation = z.object({
  body: z.object({
    currentPassword: z.string(),
    newPassword: z.string(),
  }),
});

const refreshTokenSchemaValidation = z.object({
  cookies: z.object({
    refreshToken: z.string(),
  }),
});
export const AuthValidation = {
  loginSchemaValidation,
  changePasswordSchemaValidation,
  refreshTokenSchemaValidation,
};
