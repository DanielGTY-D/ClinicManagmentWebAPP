import { useAppStore } from "~/shared/stores/useAppStore";
import styles from "./Notification.module.css";


export default function Notification() {

    const isVisible = useAppStore(state => state.showNotification);
    const message = useAppStore(state => state.notificationMessage);
    const type = useAppStore(state => state.notificationType);
    const hiddeNotification = useAppStore(state => state.setShowNotificationProps);


    setTimeout(() => {
        hiddeNotification({
            message: "",
            state: false,
            type: "error",
        })
    }, 4000)

    return (
        <div className={`${styles.container} ${styles[type]} ${isVisible && styles.show}`}>
            {
                Array.isArray(message) ? (
                    message.map( msg => (
                        <p>{msg}</p>
                    ))
                ) : (
                    <p>{message}</p>
                )
            }
        </div>
    )
}