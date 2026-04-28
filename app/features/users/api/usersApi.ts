import { api } from "~/API";
import type { userResponse, userUpdate } from "../types";
import { userResponseSchema, usersResponseSchema } from "../schemas";

export const getUsers = async (): Promise<userResponse[]> => {
  const { data } = await api.get("/users");

  const result = usersResponseSchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.data;
};

export const getUserById = async (id: string): Promise<userResponse> => {
  const { data } = await api.get(`/users/${id}`);
  const result = userResponseSchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.data;
};

export const updateUser = async (
  id: string,
  userData: userUpdate,
): Promise<userResponse> => {
  const { data } = await api.put(`/users/${id}`, userData);
  console.log(data);
  

  const result = await userResponseSchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.data;
};
