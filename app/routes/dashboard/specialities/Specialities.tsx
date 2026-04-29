import type { Route } from "./+types/Specialities";
import type { speciality } from "~/features/specialities/types";
import styles from "./Specialities.module.css";
import tableStyles from "~/shared/styles/TableBody.module.css";
import formStyles from "~/shared/styles/DumbModalBody.module.css"
import useSpecialities from "~/features/specialities/hooks/useSpecialities";
import RouteHeader from "~/shared/components/routeHeader/RouteHeader";
import Table from "~/shared/components/table/Table";
import Icons from "~/shared/icons/Icons";
import DumbModal from "~/shared/components/dumbModal/DumbModal";
import CustomButton from "~/shared/components/customButton/CustomButton";
import generateUUID from "~/shared/utils/generateUUID";
import { parseToDate } from "~/shared/utils/parseDate";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
        <thead className={tableStyles.tableHead}>
          <tr className={tableStyles.tableRow}>
            <th className={tableStyles.tableHeadItem}>Nombre</th>
            <th className={tableStyles.tableHeadItem}>Descripcion</th>
            <th className={tableStyles.tableHeadItem}>Creado</th>
            <th className={tableStyles.tableHeadItem}>Actualizado</th>
            <th className={tableStyles.tableHeadItem}>ACCIONES</th>
          </tr>
        </thead>
        <tbody className={tableStyles.tableBody}>
          {specialities &&
            specialities.map((speciality) => (
              <tr className={tableStyles.tableRow} key={generateUUID()}>
                <td className={tableStyles.tableData}>{speciality.name}</td>
                <td className={tableStyles.tableData}>{speciality.description}</td>
                <td className={tableStyles.tableData}>
                  <p>
                    {speciality.createdAt
                      ? parseToDate(speciality.createdAt)
                      : "No hay informacion para mostrar"}
                  </p>
                </td>
                <td className={tableStyles.tableData}>
                  <p>
                    {speciality.updatedAt
                      ? parseToDate(speciality.updatedAt)
                      : "Sin actualizaciones"}
                  </p>
                </td>
                <td className={tableStyles.tableDataActions}>
                  <button
                    className={tableStyles.tableEditAction}
                    onClick={() => {
                      onEdit?.(speciality);
                    }}
                  >
                    <Icons.EditIcon />
                  </button>
                  <button
                    className={tableStyles.tableDeleteAction}
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
          className={formStyles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <legend className={formStyles.legend}>
            <h3>
              Especialidades{" "}
              <p>
                {isEditing
                  ? "Actualizar especialidad"
                  : "Crear nueva especialidad"}
              </p>
            </h3>
          </legend>

          <div className={formStyles.formBody}>
            <div className={formStyles.formField}>
              <label htmlFor="name" className={formStyles.label}>
                Nombre de la especialidad{" "}
                <span className={formStyles.error}>{errors.name?.message}</span>
              </label>
              <input
                type="text"
                placeholder="Example: Cardiologia"
                {...register("name", {
                  required: "Este campo es requerido",
                })}
              />
            </div>

            <div  className={formStyles.formField}>
              <label htmlFor="name" className={formStyles.label}>
                Description{" "}
                <span className={formStyles.error}>{errors.description?.message}</span>
              </label>
              <input
                type="text"
                placeholder="Agrega una descripcion si es necesaria"
                {...register("description")}
              />
            </div>
          </div>

          <div className={formStyles.formActions}>
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
