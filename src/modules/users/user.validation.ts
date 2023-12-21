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

export const UserValidation = { userSchemaValidation };
