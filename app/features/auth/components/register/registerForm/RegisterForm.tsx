import styles from "./RegisterFrom.module.css";
import Button from "~/shared/components/button/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router";
import { useMutation } from "@tanstack/react-query";
import useAuth from "~/features/auth/hooks/useAuth";
import type { registerRequest } from "~/features/auth/types";
import FormMessage from "~/shared/components/formMessage/FormMessage";
import axios from "axios";
import { useAppStore } from "~/shared/stores/useAppStore";
import CustomButton from "~/shared/components/customButton/CustomButton";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  password: string;
  "confirm-password": string;
  terms: string;
};

export default function RegisterForm() {
  const setNotificationProps = useAppStore(
    (state) => state.setShowNotificationProps,
  );
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const createUser = useMutation({
    mutationFn: (data: registerRequest) => registerUser(data),
    onSuccess: (data) => {
      setNotificationProps({
        message: "Usuario creado correctamente",
        state: true,
        type: "success",
      });

      reset();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.errors);
        const axiosErrors = error.response?.data.errors;
        const status = error.response?.status;

        setNotificationProps({
          message: status === 500 ? "Error del servidor" : axiosErrors["PasswordHash"],
          state: true,
          type: "error",
        });
      }

      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const obj = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash: data.password,
    };

    createUser.mutate(obj);
  };

  return (
    <>
      <div className={styles.formContainer}>
        <NavLink className={styles.backToHome} to={"/"}>
          Volver al Inicio
        </NavLink>

        <div className={styles.formContainerHeader}>
          <h2 className={styles.formContainerTittle}>Crea tu cuenta</h2>
          <p className={styles.formContainerDesc}>
            Es gratis. Sin tarjeta de credito requerida
          </p>

          {/*TODO: Averiguar como se puede agregar el login con google, facebook o apple*/}

          <div className={styles.formContainerLegend}>
            <div></div>
            <p>o completa el formulario</p>
            <div></div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.field}>
              <label htmlFor="firstName" className={styles.label}>
                Nombres <span>{errors.firstName?.message}</span>
              </label>
              <input
                className={`${styles.input} ${errors.firstName && styles.error}`}
                type="text"
                id="firstName"
                placeholder={errors.firstName?.message ?? "Juan cazares"}
                {...register("firstName", {
                  required: "El nombre es requerido",
                })}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="lastName" className={styles.label}>
                Apellidos <span>{errors.lastName?.message}</span>
              </label>
              <input
                className={`${styles.input} ${errors.lastName && styles.error}`}
                type="text"
                id="lastName"
                placeholder={errors.lastName?.message ?? "Moreno del monte"}
                {...register("lastName", {
                  required: "El apellido es requerido",
                })}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Correo electronico <span>{errors.email?.message}</span>
              </label>
              <input
                className={`${styles.input} ${errors.email && styles.error}`}
                type="text"
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
            <div className={styles.field}>
              <label htmlFor="tel" className={styles.label}>
                Telefono <span>{errors.tel?.message}</span>
              </label>
              <input
                className={`${styles.input} ${errors.tel && styles.error}`}
                type="text"
                id="tel"
                placeholder={errors.tel?.message ?? "+52 555 000 0000"}
                {...register("tel", {
                  required: "El telefono es requerido",
                })}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                Password <span>{errors.password?.message}</span>
              </label>
              <input
                className={`${styles.input} ${errors.password && styles.error}`}
                type="password"
                id="password"
                placeholder={errors.password?.message ?? "********"}
                {...register("password", {
                  required: "El password es requerido",
                  minLength: {
                    value: 8,
                    message: "Minimo 8 caracteres"
                  }
                })}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="confirm-password" className={styles.label}>
                Confirma tu Password <span>{errors["confirm-password"]?.message}</span>
              </label>
              <input
                className={`${styles.input} ${errors["confirm-password"] && styles.error}`}
                type="password"
                id="confirm-password"
                placeholder={errors["confirm-password"]?.message ?? "********"}
                {...register("confirm-password", {
                  required: "Es necesario que confirmes tu password",
                  minLength: {
                    value: 8,
                    message: "Minimo 8 caracteres"
                  },
                  validate: (value, formValues) =>
                    value === formValues.password ||
                    "Las contraseñas no coinciden",
                })}
              />
            </div>
            <div className={styles.terms}>
              <input
                type="checkbox"
                {...register("terms", {
                  required: "Debes aceptar los terminos y condiciones",
                })}
              />
              <label>
                Acepto los
                <span> Terminos de servicios</span> y la
                <span> Politica de privacidad </span>
                de MedAgenda
              </label>
            </div>
            {errors.terms && <FormMessage>{errors.terms.message}</FormMessage>}

            <Button
              type="submit"
              route=""
              styleType="gradient"
              textContent={`Crear cuenta gratis`}
              hasScrollAnimation={false}
            />

            <NavLink className={styles.goToLogin} to={"/auth/login"}>Ya tienes cuenta? <span>Inicia sesion</span></NavLink>
          </form>
        </div>
      </div>
    </>
  );
}
