import { api } from "~/API";
import type { rolesResponse, roleResponse } from "~/features/roles/types/role";
import {
  roleResponseSchema,
  rolesResponseSchema,
} from "~/features/roles/schemas/roleResponse";
import type { RoleRequest } from "~/features/roles/types/role";

export default function useRoleData() {
  const token = localStorage.getItem("TOKEN");
  const getAll = async (): Promise<rolesResponse> => {
    try {
      const response = await api.get("roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = rolesResponseSchema.safeParse(response.data);

      if (!result.success) {
        throw new Error(result.error.message); // lanza el error de validacion de zod para cacharlo en la query de react query
      }

      return result.data;
    } catch (error) {
      throw error; // re-lanza el error de axios para cacharlo en la query de react query
    }
  };

  const post = async (data: RoleRequest): Promise<roleResponse> => {
    try {
      // console.log(JSON.stringify(data))
      const response = await api.post("roles", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = roleResponseSchema.safeParse(response.data);

      if (!result.success) {
        throw new Error(result.error.message); // lanza el error de validacion de zod para cacharlo en la query de react query
      }

      return result.data;
    } catch (error) {
      throw error;
    }
  };

  const put = async (data: RoleRequest, id: number): Promise<roleResponse> => {
    try {
      const response = await api.put(`roles/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = roleResponseSchema.safeParse(response.data);

      if (!result.success) {
        throw new Error(result.error.message); // lanza el error de validacion de zod para cacharlo en la query de react query
      }

      return result.data;
    } catch (error) {
      throw error;
    }
  };

  const remove = async (id: number) => {
    try {
      const response = await api.delete(`roles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = roleResponseSchema.safeParse(response.data);

      if (!result.success) {
        throw new Error(result.error.message); // lanza el error de validacion de zod para cacharlo en la query de react query
      }

      return result.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    getAll,
    post,
    put,
    remove,
  };
}
