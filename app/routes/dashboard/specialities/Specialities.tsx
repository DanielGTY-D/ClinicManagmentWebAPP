import useSpecialities from "~/features/specialities/hooks/useSpecialities";
import type { Route } from "./+types/Specialities";
import styles from "./Specialities.module.css";
import RouteHeader from "~/shared/components/routeHeader/RouteHeader";
import Table from "~/shared/components/table/Table";
import Icons from "~/shared/icons/Icons";
import { parseToDate } from "~/shared/utils/parseDate";
import type { speciality } from "~/features/specialities/types";
import DumbModal from "~/shared/components/dumbModal/DumbModal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "~/shared/components/customButton/CustomButton";
import generateUUID from "~/shared/utils/generateUUID";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clinic Managment - Roles" },
    { name: "description", content: "Role Management" },
  ];
}

interface SpecialitiesInputs {
  name: string;
  description?: string;
}

export default function Specialities() {
  const [showModalForm, setShowModalForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSpeciality, setSelectedSpeciality] = useState<speciality>();
  const {
    specialities,
    isSpecialitiesError,
    specialitiesError,
    speciality,
    isCreated,
    isUpdated,
    createSpeciality,
    updateSpeciality,
    removeSpeciality,
  } = useSpecialities(selectedSpeciality?.id.toString());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SpecialitiesInputs>();

  const onDelete = (id: number) => {
    removeSpeciality(id.toString());
  };
  const onEdit = (data: speciality) => {
    setSelectedSpeciality(data);
    setShowModalForm(true);
    setIsEditing(true);
  };
  const onSubmit = (data: SpecialitiesInputs) => {
    const obj = {
      ...selectedSpeciality!,
      name: data.name,
      description: data.description ?? "",
    };

    if (isEditing && selectedSpeciality) {
      updateSpeciality({ data: obj, id: selectedSpeciality.id.toString() });
      return;
    }

    createSpeciality(obj);
  };
  //TODO: por si llega  a haber muchas especialidades
  const onFilter = () => {};
  const onSearch = () => {};
  const onCloseModal = () => {
    setShowModalForm(false);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && selectedSpeciality) {
      reset({
        name: selectedSpeciality.name,
        description: selectedSpeciality.description ?? "",
      });
    } else {
      reset({
        name: "",
        description: ""
      });
    }
  }, [isEditing, selectedSpeciality]);

  useEffect(() => {
    setShowModalForm(false);

    if (isUpdated && isEditing) {
      setIsEditing(false);
    }
  }, [isCreated, isUpdated]);

  return (
    <>
      <RouteHeader
        routeHeader="Specialities"
        routeSubHeader="Administra todas las espcialidades de la clinica"
        customButtonProps={{
          bg: "blue",
          icon: "AddIcon",
          textContent: "Agregar nueva especialidad",
          onModalOpen: () => setShowModalForm(true),
        }}
      />

      <Table search={false}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeadItem}>Nombre</th>
            <th className={styles.tableHeadItem}>Descripcion</th>
            <th className={styles.tableHeadItem}>Creado</th>
            <th className={styles.tableHeadItem}>Actualizado</th>
            {/* <th className={styles.tableHeadItem}>ESTATUS</th> */}
            <th className={styles.tableHeadItem}>ACCIONES</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {specialities &&
            specialities.map((speciality) => (
              <tr className={styles.tableRow} key={generateUUID()}>
                <td className={styles.tableData}>{speciality.name}</td>
                <td className={styles.tableData}>{speciality.description}</td>
                <td className={styles.tableData}>
                  <p>
                    {speciality.createdAt
                      ? parseToDate(speciality.createdAt)
                      : "No hay informacion para mostrar"}
                  </p>
                </td>
                <td className={styles.tableData}>
                  <p>
                    {speciality.updatedAt
                      ? parseToDate(speciality.updatedAt)
                      : "Sin actualizaciones"}
                  </p>
                </td>
                <td className={styles.tableDataActions}>
                  <button
                    className={styles.tableEditAction}
                    onClick={() => {
                      onEdit?.(speciality);
                    }}
                  >
                    <Icons.EditIcon />
                  </button>
                  <button
                    className={styles.tableDeleteAction}
                    onClick={() => onDelete?.(speciality.id)}
                  >
                    <Icons.DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <DumbModal show={showModalForm}>
        <form
          data-form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <legend data-form-legend className={styles.legend}>
            <h3>
              Especialidades{" "}
              <p>
                {isEditing
                  ? "Actualizar especialidad"
                  : "Crear nueva especialidad"}
              </p>
            </h3>
          </legend>

          <div data-form-body>
            <div data-form-field className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Nombre de la especialidad{" "}
                <span className={styles.error}>{errors.name?.message}</span>
              </label>
              <input
                type="text"
                placeholder="Example: Cardiologia"
                {...register("name", {
                  required: "Este campo es requerido",
                })}
              />
            </div>

            <div data-form-field className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Description{" "}
                <span className={styles.error}>{errors.description?.message}</span>
              </label>
              <input
                type="text"
                placeholder="Agrega una descripcion si es necesaria"
                {...register("description", {
                  required: "Este campo es requerido",
                })}
              />
            </div>
          </div>

          <div data-form-actions>
            <CustomButton
              bg="blue"
              textContent={
                isEditing
                  ? "Actualiar especialidad"
                  : "Crear nueva especialidad"
              }
              icon=""
              type="submit"
            />
            <CustomButton
              bg="white"
              textContent="Cancelar"
              icon=""
              type="button"
              onModalOpen={onCloseModal}
            />
          </div>
        </form>
      </DumbModal>
    </>
  );
}
