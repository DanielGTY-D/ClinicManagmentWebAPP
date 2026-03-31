import { z } from "zod";
import type { roleResponseSchema, rolesResponseSchema } from "~/schemas/role/roleResponse";


export type roleResponse = z.infer<typeof roleResponseSchema>;
export type rolesType = z.infer<typeof rolesResponseSchema>; 
