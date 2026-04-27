import type { StateCreator } from "zustand";
import type { userResponse } from "~/features/users/types";

export interface GlobalSliceState {
    userData: userResponse
    setUserData: (data: userResponse) => void;
}

export const GlobalSlice: StateCreator<GlobalSliceState> = (set) => ({
    userData: {} as userResponse,
    setUserData: (data) => set(() => ({userData: data}))
});
