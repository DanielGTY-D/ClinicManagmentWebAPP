import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ModalCreateSllice, type ModalCreateState } from "../slices/ModalCreateSlice";

export const useAppStore = create<ModalCreateState >()(
  devtools(
    (...a) => ({
      ...ModalCreateSllice(...a),
    }),
    { name: "AppStore" } // 👈 nombre que aparece en Redux DevTools
  )
);