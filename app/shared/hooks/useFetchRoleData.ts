import { success } from "zod"
import { api } from "~/API"
import type { rolesType } from "~/types/infered/role";
import { rolesResponseSchema } from "~/types/responses/role/roleResponse";

export default function useFetchRoleData() {

    const getRoles = async () : Promise<rolesType> => {
        try {
            const response = await api.get("roles");
            const result = rolesResponseSchema.safeParse(response.data);

            if ( !result.success ) {
                throw new Error(result.error.message); // lanza el error de validacion de zod para cacharlo en la query de react query
            }
            
            return result.data;
        } catch (error) {
            throw error; // re-lanza el error de axios para cacharlo en la query de react query
        }
    }

    return {
        getRoles
    }
}