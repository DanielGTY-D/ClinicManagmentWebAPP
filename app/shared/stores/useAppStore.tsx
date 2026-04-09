import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ModalCreateSllice, type ModalCreateState } from "../slices/ModalCreateSlice";
import { NotificationSlice, type NotificationSliceState } from "../slices/NotificationSlice";

export const useAppStore = create<ModalCreateState & NotificationSliceState>()(
  devtools(
    (...a) => ({
      ...ModalCreateSllice(...a),
      ...NotificationSlice(...a),
    }),
    { name: "AppStore" } // 👈 nombre que aparece en Redux DevTools
  )
);