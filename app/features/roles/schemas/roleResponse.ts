import { z } from "zod";

export const roleResponseSchema = z.object({
    id: z.int(),
    name: z.string(),
    isDeleted: z.boolean().nullable(),
    isActive: z.boolean(),
    desactivationReason: z.string().nullable(),
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(),
})

export const roleOnlyNameResponseSchema = z.object({
    name: z.string()
})

export const rolesResponseSchema = z.array(roleResponseSchema);
