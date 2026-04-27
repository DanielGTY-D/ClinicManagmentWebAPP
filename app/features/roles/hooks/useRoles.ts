// features/roles/hooks/useRoles.ts  — todo en un solo hook
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getRoles, createRole, updateRole, removeRole } from "../api/rolesApi"
import type { RolesInputs } from "~/routes/dashboard/roles/Roles"

export const ROLES_KEY = ["roles"] as const

export const useRoles = () => {
  const queryClient = useQueryClient()

  const rolesQuery = useQuery({
    queryKey: ROLES_KEY,
    queryFn: getRoles
  })

  const createMutation = useMutation({
    mutationFn: createRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ROLES_KEY })
  })

  const updateMutation = useMutation({
    mutationFn: ({ role, id }: { role: RolesInputs; id: number }) => updateRole(role, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ROLES_KEY })
  })

  const deleteMutation = useMutation({
    mutationFn: removeRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ROLES_KEY })
  })

  return {
    // Query
    roles: rolesQuery.data ?? [],
    isLoading: rolesQuery.isLoading,
    isError: rolesQuery.isError,

    // Mutations
    createRole: createMutation.mutate,
    updateRole: updateMutation.mutate,
    deleteRole: deleteMutation.mutate,

    // Estados
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}