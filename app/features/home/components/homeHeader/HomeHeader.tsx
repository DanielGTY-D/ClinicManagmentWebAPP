import { NavLink } from "react-router";
import styles from "./HomeHeader.module.css";
import Icons from "~/shared/icons/Icons";
import Button from "../button/Button";

export default function HomeHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerBrand}>
          <i>
            <Icons.LogoIconTwo />
          </i>
          <h1>
            Med<span>Agenda</span>
          </h1>
        </div>

        <ul className={styles.headerNav}>
          <li className={styles.navItem}>
            <a href="#">Servicios</a>
          </li>
          <li className={styles.navItem}>
            <a href="#">Especialistas</a>
          </li>
          <li className={styles.navItem}>
            <a href="#">Caracteristicas</a>
          </li>
          <li className={styles.navItem}>
            <a href="#">Testimonios</a>
          </li>
        </ul>

        <div className={styles.headerActions}>
          <Button
            route="/"
            styleType="simple"
            textContent="Iniciar sesion"
            hasScrollAnimation={true}
          />
          <Button route="/" styleType="gradient" textContent="Registrarse" />
        </div>
      </div>
    </header>
  );
}
