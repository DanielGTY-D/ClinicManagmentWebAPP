import { api } from "~/API";
import { PatientResponseSchema } from "../schemas";
import type { PatientRequest, PatientRespones } from "../types";

export const createPatient = async (
  patientInfo: PatientRequest,
): Promise<PatientRespones> => {
  const { data } = await api.post("/patients", patientInfo);
  const result = PatientResponseSchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.data;
};
