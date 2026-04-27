import { email, z } from "zod";
import { roleResponseSchema } from "~/features/roles/schemas/roleResponse";

export const userResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  desactivationReason: z.string().nullable(),
  isActive: z.boolean(),
  isAssigned: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  role: roleResponseSchema,
  imageProfile: z.string().nullable()
});

export const usersResponseSchema = z.array(userResponseSchema);

export const userUpdateSchema = z.object({
  username: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  roleId: z.number()
});
