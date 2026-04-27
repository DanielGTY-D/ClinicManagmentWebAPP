import { api } from "~/API";
import type { RoleRequest, roleResponse, rolesResponse } from "../types/role";
import {
  roleResponseSchema,
  rolesResponseSchema,
} from "../schemas/roleResponse";

export const getRoles = async (): Promise<rolesResponse> => {
  const response = await api.get("roles");
  const result = rolesResponseSchema.safeParse(response.data);

  if (!result.success) {
    throw new Error(result.error.message); // lanza el error de validacion de zod para cacharlo en la query de react query
  }

  return result.data;
};

export const createRole = async (data: RoleRequest): Promise<roleResponse> => {
  const response = await api.post("roles", data);
  const result = roleResponseSchema.safeParse(response.data);

  if (!result.success) {
    throw new Error(result.error.message); // lanza el error de validacion de zod para cacharlo en la query de react query
  }

  return result.data;
};

export const updateRole = async (
  data: RoleRequest,
  id: number,
): Promise<roleResponse> => {
  const response = await api.put(`roles/${id}`, data);
  const result = roleResponseSchema.safeParse(response.data);

  if (!result.success) {
    throw new Error(result.error.message); // lanza el error de validacion de zod para cacharlo en la query de react query
  }

  return result.data;
};

export const removeRole = async (id: number) => {
  const response = await api.delete(`roles/${id}`);
  const result = roleResponseSchema.safeParse(response.data);

  if (!result.success) {
    throw new Error(result.error.message); // lanza el error de validacion de zod para cacharlo en la query de react query
  }

  return result.data;
};
