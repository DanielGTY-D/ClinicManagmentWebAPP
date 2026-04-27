import { NavLink, useNavigate } from "react-router";
import styles from "./HomeHeader.module.css";
import Icons from "~/shared/icons/Icons";
import Button from "../../../../shared/components/button/Button";
import { getTokenPayload, type TokenPayload } from "~/shared/utils/jwtDecode";
import { useEffect, useState } from "react";

export default function HomeHeader() {
  const [tokenPayload, setTokenPayload] = useState<TokenPayload | null>(null);
  const navigate = useNavigate();
  const role = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

  const onCloseSession = () => {
    localStorage.removeItem("TOKEN")
    setTokenPayload(null);
  }


  useEffect(() => {
    const tokenData = getTokenPayload();

    if (!tokenData) {
      navigate("/");
    }

    setTokenPayload(tokenData);
  }, []);

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
          {tokenPayload ? (
            <>
              <Button
                route=""
                styleType="simple"
                textContent="Cerrar sesion"
                type="link"
                customFn={onCloseSession}
              />
              <Button
                route="dashboard"
                styleType="gradient"
                textContent="Dashboard"
                type="link"
              />
            </>
          ) : (
            <>
              <Button
                route="auth/login"
                styleType="simple"
                textContent="Iniciar sesion"
                hasScrollAnimation={true}
                type="link"
              />
              <Button
                route="auth/register"
                styleType="gradient"
                textContent="Registrarse"
                type="link"
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
