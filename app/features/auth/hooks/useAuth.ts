import { api } from "~/API"
import type { loginResponse, registerRequest, registerResponse } from "../types"
import { loginResponseSchema, userResponseSchema } from "../schemas";


export default function useAuth() {

    const registerUser = async (user: registerRequest) :  Promise<registerResponse> => {
        const { data } = await api.post("/users", user);
        const result = userResponseSchema.safeParse(data);

        if (!result.success) {
            throw new Error(result.error.message);
        }

        return result.data;
    }

    const logingUser = async ({email, password}: {email: string, password: string}) : Promise<loginResponse> => {
        const { data } = await api.post("auth/login", {email, password});
        const result = loginResponseSchema.safeParse(data);

        if (!result.success) {
            throw new Error(result.error.message);
        }

        return result.data;
    }

    return {
        registerUser,
        logingUser
    }
}