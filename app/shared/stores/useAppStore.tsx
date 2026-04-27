import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ModalCreateSllice, type ModalCreateState } from "../slices/ModalCreateSlice";
import { NotificationSlice, type NotificationSliceState } from "../slices/NotificationSlice";
import { GlobalSlice, type GlobalSliceState } from "../slices/GlobalSlice";

export const useAppStore = create<ModalCreateState & NotificationSliceState & GlobalSliceState>()(
  devtools(
    (...a) => ({
      ...ModalCreateSllice(...a),
      ...NotificationSlice(...a),
      ...GlobalSlice(...a)
    }),
    { name: "AppStore" } // 👈 nombre que aparece en Redux DevTools
  )
);