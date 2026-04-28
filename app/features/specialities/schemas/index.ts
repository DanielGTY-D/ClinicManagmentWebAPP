import { z } from "zod";

export const specialitySchema = z.object({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string().nullable(),
    name: z.string(),
    description: z.string().nullable()
})
export const specialitiesSchema = z.array(specialitySchema);