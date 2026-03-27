import { z } from "zod";
import type { rolesResponseSchema } from "../responses/role/roleResponse";

export type roleType = z.infer<typeof rolesResponseSchema>;
export type rolesType = z.infer<typeof rolesResponseSchema>; 