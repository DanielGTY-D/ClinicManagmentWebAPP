import { NavLink, useNavigate, useParams } from "react-router";
import styles from "./AssignForm.module.css";
import usePatients from "~/features/patients/hooks/usePatients";
import Button from "~/shared/components/button/Button";
import Icons from "~/shared/icons/Icons";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

/*
  LicenseNumber
  EmployeeId,
  SpecialityId
  ConsultingRoomId
*/

type BloodGroups = "A+" | " A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

interface Inputs {
  curp: string;
  birthDate: Date;
  bloodGroup: BloodGroups;
  allergies: string;
}

export default function AssignForm() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { createPatient } = usePatients();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const obj = {
      ...formData,
      birthDate: formData.birthDate.toString(),
      userId: parseInt(userId!),
    };
    createPatient(obj);
  };

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [])

  const BloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB+", "O+", "O+"];

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <NavLink className={styles.backToHome} to={"/"}>
        Regresar al Inicio
        <i>
          <Icons.ArrowRightIcon />
        </i>
      </NavLink>
      <legend className={styles.legend}>
        Ingresa tus datos para completar tu perfil
      </legend>

      <div className={styles.formBody}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="curp">
            Curp{" "}
            <span className={styles.inputError}>{errors.curp?.message}</span>
          </label>
          <input
            className={`${styles.input}`}
            type="text"
            id="curp"
            placeholder={"Ingresa tu curp"}
            {...register("curp", {
              required: "Este campo es requerido",
            })}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="birthDate">
            Fecha de nacimiento{" "}
            <span className={styles.inputError}>
              {errors.birthDate?.message}
            </span>
          </label>
          <input
            className={`${styles.input}`}
            type="date"
            id="birthDate"
            {...register("birthDate", {
              required: "Este campo es requerido",
              validate: (value, inputs) => {},
            })}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="bloodgroup">
            Tipo de Sangre{" "}
            <span className={styles.inputError}>
              {errors.bloodGroup?.message}
            </span>
          </label>
          <select
            id="bloodgroup"
            className={styles.input}
            {...register("bloodGroup", {
              required: "Este campo es requerido",
            })}
          >
            <option selected disabled>
              -- Selecciona tu grupo sanguineo
            </option>
            {BloodGroups.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="curp">
            Allergies{" "}
            <span className={styles.inputError}>
              {errors.allergies?.message}
            </span>
          </label>
          <textarea
            className={`${styles.textarea}`}
            placeholder={"Alergia la polen"}
            id="allergies"
            {...register("allergies", {
              required: "Este campo es requerido",
            })}
          />
        </div>
      </div>

      <Button
        route=""
        styleType="gradient"
        textContent="Continuar"
        type="submit"
      />
    </form>
  );
}
