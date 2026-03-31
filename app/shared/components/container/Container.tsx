import type { ReactNode } from "react";
import styles from "./Container.module.css";

interface ContainerPorps {
    children: ReactNode
}

export default function Container({children}:ContainerPorps) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}