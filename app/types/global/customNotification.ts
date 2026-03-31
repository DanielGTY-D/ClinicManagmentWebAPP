export interface CustomNotificationProps {
  message?: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
}

export interface CustomNotification {
  notification: CustomNotificationProps | null;
  showNotification: (notification: CustomNotificationProps) => void;
  hideNotification: () => void;
}
