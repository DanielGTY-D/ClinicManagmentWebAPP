import styles from "./FormMessage.module.css";

interface FormMessageProps {
    children: React.ReactNode
}

export default function FormMessage({children}: FormMessageProps) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}