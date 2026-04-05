import type React from "react";
import styles from "./HeaderSection.module.css";

interface HeaderSectionProps {
    icon: React.ReactNode;
    title: string;
    opt: string;
    desc: string
}

export default function HeaderSection({desc, icon, opt, title}: HeaderSectionProps) {
    return (
        <header className={styles.header}>
          <h2 className={styles.tittle}>
            <i className={styles.icon}>
              {icon}
            </i>
            {title}
          </h2>

          <span className={styles.opt}>
            {opt}
          </span>
          <p className={styles.description}>
            {desc}
          </p>
        </header>
    )
}