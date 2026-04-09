import { z } from 'zod';
import type { loginResponseSchema, userResponseSchema } from '../schemas';

export type registerResponse = z.infer<typeof userResponseSchema>;
export type loginResponse = z.infer<typeof loginResponseSchema>;

export interface registerRequest {
    email: string;
    passwordHash: string
    firstName: string;
    lastName: string;
}