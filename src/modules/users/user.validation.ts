import { z } from 'zod';

const userSchemaValidation = z.object({
  name: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  email: z.string().email(),
  phone: z.string(),
  role: z.enum(['user', 'admin', 'superAdmin']).default('user'),
  status: z.enum(['active', 'blocked']).default('active'),
});

const updateUserSchemaValidation = z.object({
  name: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  role: z.enum(['user', 'admin', 'superAdmin']).optional(),
  status: z.enum(['active', 'blocked']).optional(),
});
export const UserValidation = {
  userSchemaValidation,
  updateUserSchemaValidation,
};
