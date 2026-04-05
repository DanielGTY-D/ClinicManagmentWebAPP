import { z } from "zod";
import type { roleResponseSchema, rolesResponseSchema } from "~/features/roles/schemas/roleResponse";


export type roleResponse = z.infer<typeof roleResponseSchema>;
export type rolesResponse = z.infer<typeof rolesResponseSchema>; 
export interface RoleRequest {
    name: string
}