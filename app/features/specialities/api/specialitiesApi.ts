import { api } from "~/API";
import { specialitiesSchema, specialitySchema } from "../schemas";
import type { speciality } from "../types";

export const getSpecialities = async () : Promise<speciality[]> => {
  const { data } = await api.get("/specialities");
  const result = specialitiesSchema.safeParse(data);

  if (!result.success) throw new Error(result.error.message);

  return result.data;
};

export const getSpecialityById = async (id: string) : Promise<speciality>  => {
    const { data } = await api.get(`/specialities/${id}`);
  const result = specialitySchema.safeParse(data);

  if (!result.success) throw new Error(result.error.message);

  return result.data;
}

export const createSpeciality = async (
  dto: speciality,
): Promise<speciality> => {
  const { data } = await api.post(`/specialities/`, dto);
  const result = specialitySchema.safeParse(data);

  if (!result.success) throw new Error(result.error.message);

  return result.data;
};

export const updateSpeciality = async (
  dto: speciality,
  id: string
): Promise<speciality> => {
  const { data } = await api.put(`/specialities/${id}`, dto);
  const result = specialitySchema.safeParse(data);

  if (!result.success) throw new Error(result.error.message);

  return result.data;
};

export const removeSpeciality = async (id: string): Promise<speciality> => {
  const { data } = await api.delete(`/specialities/${id}`);
  const result = specialitySchema.safeParse(data);

  if (!result.success) throw new Error(result.error.message);

  return result.data;
};
