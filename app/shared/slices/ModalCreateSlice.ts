import type { StateCreator } from "zustand";

export interface ModalCreateState {
  isModalOpen: boolean;
  setActivateModal: (isOpen: boolean) => void;
}

export const ModalCreateSllice: StateCreator<ModalCreateState> = (set) => ({
  isModalOpen: false,
  setActivateModal: (isOpen: boolean) => set({ isModalOpen: isOpen }),
});
