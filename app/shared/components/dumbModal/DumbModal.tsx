import styles from "./DumbModal.module.css";

export default function DumbModal({ children, show }: {children: React.ReactNode, show: boolean}) {
    return (
        <div className={`${styles.container} ${show ? styles.show : ""}`}>
            <div className={styles.modalBody}>
                {children}
            </div>
        </div>
    )
}