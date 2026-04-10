import { api } from "~/API"
import { userResponseSchema, usersResponseSchema } from "../schemas";
import type { userResponse, userUpdate } from "../types";


export default function useUsers() {

  const getAllUsers = async (): Promise<userResponse[]> => {
    const { data } = await api.get("/users");
    const result = usersResponseSchema.safeParse(data);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  const updateUser = async (userData: userUpdate) => {
    const { data } = await api.put("/users", userData);

  }

  return {
    getAllUsers,
  }
}
