import { z } from 'zod';
import { roleOnlyNameResponseSchema } from '~/features/roles/schemas/roleResponse';

export const userRegisterResponseSchema = z.object({
    username: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    isAssigned: z.boolean(),
    role: roleOnlyNameResponseSchema.nullable()
})

export const userLoginResponseSchema = z.object({
    token: z.string()
})
