import { z } from "zod";

export const PatientResponseSchema = z.object({
    id: z.number(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    isActive: z.boolean(),
    desactivationReason: z.string(),
    curp: z.string(),
    birthDate: z.string().datetime(),
    bloodGroup: z.string(),
    allergies: z.string(),
});

export const PatientRequestSchema = z.object({
    curp: z.string(),
    birthDate: z.string(),
    bloodGroup: z.string(),
    allergies: z.string(),
    userId: z.number()
})

