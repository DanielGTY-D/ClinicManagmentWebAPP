import { NavLink, useNavigate } from "react-router";
import styles from "./LoginForm.module.css";
import Button from "~/shared/components/button/Button";
import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAuth from "~/features/auth/hooks/useAuth";
import axios from "axios";
import { useAppStore } from "~/shared/stores/useAppStore";
import { type TokenPayload } from "~/shared/utils/jwtDecode";
import { jwtDecode } from "jwt-decode";


interface Inputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const setNotificationProps = useAppStore(
    (state) => state.setShowNotificationProps,
  );
  const { logingUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const mutation = useMutation({
    mutationFn: (user: Inputs) => logingUser(user),
    onSuccess: (data) => {
      localStorage.setItem("TOKEN", data.token);
      
      const tokenDecoded = jwtDecode<TokenPayload>(data.token);

      if(!JSON.parse(tokenDecoded.IsAssigned.toLowerCase())) {
        navigate(`/assign/${tokenDecoded.sub}`)
        return; 
      }
      
      setNotificationProps({
        message: "Iniciando sesion",
        state: true,
        type: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);

        setNotificationProps({
          message: error.response?.data.message,
          state: true,
          type: "error",
        });
      }
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className={styles.formContainer}>
        <NavLink className={styles.backToHome} to={"/"}>
          Volver al Inicio
        </NavLink>

        <div className={styles.formContainerHeader}>
          <h2 className={styles.formContainerTittle}>Bienvenido de vuelta</h2>
          <p className={styles.formContainerDesc}>
            Inicia sesion para gestionar tus citas medicas
          </p>
        </div>

        <div className={styles.formContainerLegend}>
          <div></div>
          <p>o completa el formulario</p>
          <div></div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.field}`}>
            <label htmlFor="email" className={styles.label}>
              Correo electronico
            </label>
            <input
              className={`${styles.input} ${errors.email && styles.error}`}
              type="email"
              id="email"
              placeholder={errors.email?.message ?? "tu@email.com"}
              {...register("email", {
                required: "El email es requerido",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "No es un email valido",
                },
              })}
            />
          </div>
          <div className={`${styles.field}`}>
            <label htmlFor="password" className={styles.label}>
              Correo electronico
            </label>
            <input
              className={`${styles.input} ${errors.password && styles.error}`}
              type="password"
              id="password"
              placeholder={errors.password?.message ?? "*******"}
              {...register("password", {
                required: "El password es requerido",
                minLength: {
                  value: 8,
                  message: "El password debe contener minimo 8 caracteres",
                },
              })}
            />
          </div>
          <div className={styles.actions}>
            <div>
              <input type="checkbox" />
              <label>Recordarme</label>
            </div>
            <NavLink to={"auth/forgotPassword"}>Olvidaste tu password?</NavLink>
          </div>

          <Button
            type="submit"
            route=""
            styleType="gradient"
            textContent={`Iniciar sesion`}
            hasScrollAnimation={false}
          />
        </form>

        <div className={styles.formLoginAction}>
          <NavLink to={"/auth/register"}>
            No tienes cuenta? <span> Registrate gratis</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}
