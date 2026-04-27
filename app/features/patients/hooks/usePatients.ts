import { api } from "~/API"
import type { PatientRequest, PatientRespones } from "../types"
import { PatientResponseSchema } from "../schemas"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createPatient } from "../api/patientsApi";

export const PATIENTS_KEY = ["patients"] as const;

export default function usePatients() {
    const queryClient = useQueryClient();

    const patientsQuery = useQuery({
        queryKey: PATIENTS_KEY,
    })

    const createMutation = useMutation({
        mutationFn: (data: PatientRequest) => createPatient(data),
        onSuccess: () => queryClient.invalidateQueries({queryKey: PATIENTS_KEY})
    })

    return {
        // Queries
        patiets: patientsQuery.data,
        isPatientsLoading: patientsQuery.isLoading,
        isPatientsError: patientsQuery.isError, 

        // Mutations
        createPatient: createMutation.mutate

    }
}