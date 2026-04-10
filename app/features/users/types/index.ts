import { z } from "zod";
import type { userResponseSchema, userUpdateSchema } from "../schemas";

export type userResponse = z.infer<typeof userResponseSchema>;
export type userUpdate = z.infer<typeof userUpdateSchema>;
