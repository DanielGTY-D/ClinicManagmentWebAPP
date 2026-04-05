import styles from "./RegisterFrom.module.css";
import { NavLink } from "react-router";
import Button from "~/features/home/components/button/Button";


export default function RegisterForm() {
  return (
    <>
      <div className={styles.formContainer}>
        <NavLink className={styles.backToHome} to={"/"}>Volver al Inicio</NavLink>

        <div className={styles.formContainerHeader}>
          <h2 className={styles.formContainerTittle}>Crea tu cuenta</h2>
          <p className={styles.formContainerDesc}>Es gratis. Sin tarjeta de credito requerida</p>

          {/*TODO: Averiguar como se puede agregar el login con google, facebook o apple*/}

          <div className={styles.formContainerLegend}>
            <div></div>
            <p>o completa el formulario</p>
            <div></div>
          </div>

          <form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>Nombre completo</label>
              <input className={styles.input} type="text" id="name" name="name" placeholder="Juan Peres" />
            </div>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Correo electronico</label>
              <input className={styles.input} type="text" id="email" name="email" placeholder="tu@gmail.com" />
            </div>
            <div className={styles.field}>
              <label htmlFor="tel" className={styles.label}>Correo electronico</label>
              <input className={styles.input} type="text" id="tel" name="tel" placeholder="+52 555 000 0000" />
            </div>
            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>Correo electronico</label>
              <input className={styles.input} type="text" id="password" name="password" placeholder="********" />
            </div>
            <div className={styles.field}>
              <label htmlFor="confirm-password" className={styles.label}>Correo electronico</label>
              <input className={styles.input} type="text" id="confirm-password" name="confirm-password" placeholder="********" />
            </div>
            <div className={styles.terms}>
              <input type="checkbox" />
              <label>Acepto los
                <span>{" "}Terminos de servicios</span> y la
                <span>{" "}Politica de privacidad{" "}</span>
                de MedAgenda
              </label>
            </div>

            <Button route="" styleType="gradient" textContent={`Crear cuenta gratis`} hasScrollAnimation={false} />
          </form>
        </div>
      </div>
    </>
  )
}


