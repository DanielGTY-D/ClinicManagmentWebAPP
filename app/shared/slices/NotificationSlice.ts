import type { StateCreator } from "zustand";

type NotificationTypes = "error" | "success"

export interface NotificationSliceState {
  showNotification: boolean;
  notificationMessage: string[] | string;
  notificationType: NotificationTypes
  setShowNotificationProps: (
    {
        state, 
        message, 
        type
    }: {state: boolean, message: string, type: NotificationTypes}
    ) => void;
}

export const NotificationSlice: StateCreator<NotificationSliceState> = (set) => ({
    showNotification: false,
    notificationMessage: "",
    notificationType: "error",
    setShowNotificationProps: ({state, message, type}) => set(() => ({
        showNotification: state,
        notificationMessage: message,
        notificationType: type
    }))
});