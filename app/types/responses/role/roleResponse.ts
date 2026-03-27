import { z } from "zod";

export const roleResponseSchema = z.object({
    id: z.int(),
    name: z.string(),
    isDeleted: z.boolean(),
    isActive: z.boolean(),
    desactivationReason: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string().nullable(),
})

export const rolesResponseSchema = z.array(roleResponseSchema);