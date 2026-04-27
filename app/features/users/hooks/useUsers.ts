import { api } from "~/API"
import { userResponseSchema, usersResponseSchema } from "../schemas";
import type { userResponse, userUpdate } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserById, getUsers, updateUser } from "../api/usersApi";

export const USERS_KEY = ["users"] as const;

export default function useUsers(id : string | null = null) {

  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: USERS_KEY,
    queryFn: getUsers
  })

  const userQueryById = useQuery({
    queryKey: ["user", id], 
    queryFn: () => getUserById(id!),
    enabled: id !== null,
  })

  const updateMutation = useMutation({
    mutationFn: ({id, data} : {id: string, data: userUpdate}) => updateUser(id, data),
    onSuccess: () => queryClient.invalidateQueries({queryKey: USERS_KEY})
  })

  return {
    // query
    users: usersQuery.data ?? [],
    isUsersLoding : usersQuery.isLoading,
    isUsersError : usersQuery.isError,
    isUsersSuccess: usersQuery.isSuccess,

    user: userQueryById.data,
    isUserLoading: userQueryById.isLoading,
    isUserError: userQueryById.isError,
    isUserSuccess : userQueryById.isSuccess,

    // Mutations
    updateUser: updateMutation.mutate,
    isUpdated: updateMutation.isSuccess,

    // estados
    isUpdating: updateMutation.isPending,
  }
}
