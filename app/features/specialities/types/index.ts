import { z } from "zod";
import type { specialitySchema } from "../schemas";

export type speciality = z.infer<typeof specialitySchema>;