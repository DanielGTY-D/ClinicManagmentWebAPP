import { z } from 'zod';
import type { userLoginResponseSchema, userRegisterResponseSchema } from '../schemas';

export type registerResponse = z.infer<typeof userRegisterResponseSchema>;
export type loginResponse = z.infer<typeof userLoginResponseSchema>;

export interface registerRequest {
    email: string;
    passwordHash: string
    firstName: string;
    lastName: string;
}