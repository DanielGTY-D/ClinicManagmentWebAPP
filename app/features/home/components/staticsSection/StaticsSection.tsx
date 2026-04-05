import Icons from "~/shared/icons/Icons";
import styles from "./Statics.module.css";

export default function StaticsSection() {
    return (
        <section className={styles.statics}>
            <div className={styles.staticsContainer}>
                <ul className={styles.staticsList}>
                    <li className={styles.item}>
                        <i className={styles.itemIcon}>
                            <Icons.UsersIcon />
                        </i>

                        <div className={styles.itemContent}>
                            <p>50,000+</p>
                            <p>Pacientes atendidos</p>
                        </div>
                    </li>
                    <li className={styles.item}>
                        <i className={styles.itemIcon}>
                            <Icons.StethoscopeIcon />
                        </i>

                        <div className={styles.itemContent}>
                            <p>1,200+</p>
                            <p>Especialistas activos</p>
                        </div>
                    </li>
                    <li className={styles.item}>
                        <i className={styles.itemIcon}>
                            <Icons.InsurancesIcon />
                        </i>

                        <div className={styles.itemContent}>
                            <p>99.9%</p>
                            <p>Updtime garantizado</p>
                        </div>
                    </li>
                    <li className={styles.item}>
                        <i className={styles.itemIcon}>
                            <Icons.CalendarIcon />
                        </i>

                        <div className={styles.itemContent}>
                            <p>24/7</p>
                            <p>Soporte disponible</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}