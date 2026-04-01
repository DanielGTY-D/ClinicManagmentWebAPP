import type { StateCreator } from "zustand";
import type { RoleRequest } from "~/types/request/role";

export interface ModalCreateState {
  isModalOpen: boolean;
  roleData: RoleRequest | null;
  setToggleModal: (isOpen: boolean) => void;
  setRoleData: (data: RoleRequest | null) => void;
}

export const ModalCreateSllice: StateCreator<ModalCreateState> = (set) => ({
  isModalOpen: false,
  roleData: null,
  setToggleModal: (isOpen: boolean) => set({ isModalOpen: isOpen }),
  setRoleData: (data: RoleRequest | null) => set({ roleData: data }),
});
