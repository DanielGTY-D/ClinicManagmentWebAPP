import { NavLink } from "react-router";
import styles from "./LoginForm.module.css";
import Button from "~/features/home/components/button/Button";


export default function LoginForm() {
  return (
    <>
      <div className={styles.formContainer}>
        <NavLink className={styles.backToHome} to={"/"}>Volver al Inicio</NavLink>

        <div className={styles.formContainerHeader}>
          <h2 className={styles.formContainerTittle}>Bienvenido de vuelta</h2>
          <p className={styles.formContainerDesc}>Inicia sesion para gestionar tus citas medicas</p>
        </div>

        <div className={styles.formContainerLegend}>
          <div></div>
          <p>o completa el formulario</p>
          <div></div>
        </div>


        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Correo electronico</label>
            <input className={styles.input} type="text" id="email" name="email" placeholder="tu@gmail.com" />
          </div>
          <div className={styles.field}>
            <label htmlFor="confirm-password" className={styles.label}>Correo electronico</label>
            <input className={styles.input} type="text" id="confirm-password" name="confirm-password" placeholder="********" />
          </div>
          <div className={styles.actions}>
            <div>
              <input type="checkbox" />
              <label>
                Recordarme
              </label>
            </div>
            <NavLink to={"auth/forgotPassword"} >Olvidaste tu password?</NavLink>
          </div>

          <Button route="" styleType="gradient" textContent={`Iniciar sesion`} hasScrollAnimation={false} />
        </form>

        <div className={styles.formLoginAction}>
          <NavLink to={"auth/register"}>No tienes cuenta? <span> Registrate gratis</span></NavLink>
        </div>
      </div>
    </>
  )
}
