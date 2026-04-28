import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSpeciality,
  getSpecialities,
  getSpecialityById,
  removeSpeciality,
  updateSpeciality,
} from "../api/specialitiesApi";
import axios from "axios";
import type { speciality } from "../types";

export const SPECIALITIES_KEY = ["specialities"] as const;

export default function useSpecialities(id: string | null = null) {
  const queryClient = useQueryClient();

  const specialitiesQuery = useQuery({
    queryKey: SPECIALITIES_KEY,
    queryFn: getSpecialities,
  });

  const specialityQuery = useQuery({
    queryKey: ["speciality", id],
    queryFn: () => getSpecialityById(id!),
    enabled: id !== null 
  })

  const createMutation = useMutation({
    mutationFn: createSpeciality,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: SPECIALITIES_KEY }),
    onError:(error) => {
      if(axios.isAxiosError(error)) {
        console.log(error.response);
      }
    }
  });

  const updateMutatation = useMutation({
    mutationFn: ({data, id} : {data: speciality, id: string}) => updateSpeciality(data, id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: SPECIALITIES_KEY }),
  });

  const deleteMutation = useMutation({
    mutationFn: removeSpeciality,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: SPECIALITIES_KEY }),
  });

  return {
    // queries
    specialities: specialitiesQuery.data,
    isSpecialitiesLoading: specialitiesQuery.isLoading,
    isSpecialitiesError: specialitiesQuery.isError,
    specialitiesError: specialitiesQuery.error,

    speciality: specialityQuery.data,
    isSpecialityLoading: specialityQuery.isLoading,
    isSpecialityError : specialityQuery.isError,
    specialityErro: specialityQuery.error,

    // mutation
    createSpeciality: createMutation.mutate,
    updateSpeciality: updateMutatation.mutate,
    removeSpeciality: deleteMutation.mutate,

    // estados
    isCreating: createMutation.isPending,
    isCreated: createMutation.isSuccess,

    isUpdating: updateMutatation.isPending,
    isUpdated: updateMutatation.isSuccess,

    isDeleting: deleteMutation.isPending,
    isDeleted: deleteMutation.isSuccess,
  };
}
