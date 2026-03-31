import type { StateCreator } from "zustand";
import type { RoleRequest } from "~/types/request/role";

export interface ModalCreateState {
  isModalOpen: boolean;
  roleData: RoleRequest | null;
  setActivateModal: (isOpen: boolean) => void;
  setRoleData: (data: RoleRequest | null) => void;
}

export const ModalCreateSllice: StateCreator<ModalCreateState> = (set) => ({
  isModalOpen: false,
  roleData: null,
  setActivateModal: (isOpen: boolean) => set({ isModalOpen: isOpen }),
  setRoleData: (data: RoleRequest | null) => set({ roleData: data }),
});
