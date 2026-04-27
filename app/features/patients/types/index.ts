import { z } from 'zod';
import type { PatientRequestSchema, PatientResponseSchema } from '../schemas';

export type PatientRespones = z.infer<typeof PatientResponseSchema>;
export type PatientRequest = z.infer<typeof PatientRequestSchema>;