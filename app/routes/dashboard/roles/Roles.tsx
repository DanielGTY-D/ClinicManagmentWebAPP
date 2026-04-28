import type { Route } from "./+types/Roles";
import type { roleResponse } from "~/features/roles/types/role";
import styles from "./Role.module.css";
import formStyles from "~/shared/styles/DumbModalBody.module.css";
import tableStyles from "~/shared/styles/TableBody.module.css";
import RouteHeader from "~/shared/components/routeHeader/RouteHeader";
import DumbModal from "~/shared/components/dumbModal/DumbModal";
import CustomButton from "~/shared/components/customButton/CustomButton";
import Table from "~/shared/components/table/Table";
import Icons from "~/shared/icons/Icons";
import { useRoles } from "~/features/roles/hooks/useRoles";
import { parseToDate } from "~/shared/utils/parseDate";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clinic Managment - Roles" },
    { name: "description", content: "Role Management" },
  ];
}

export interface RolesInputs {
  name: string;
}

export default function Roles() {
  const {
    roles,
    createRole,
    updateRole,
    isUpdated,
    isDeleted,
    isCreated,
    deleteRole,
    isLoading,
    isError,
    error,
  } = useRoles();
  const [showModalForm, setShowModalForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState<roleResponse>();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RolesInputs>();

  const onEdit = (role: roleResponse) => {
    setIsEditing(true);
    setSelectedRole(role);
    setShowModalForm(true);
  };

  const onDelete = (id: number) => {
    deleteRole(id);
  };

  const onSubmit: SubmitHandler<RolesInputs> = (data) => {
    if (isEditing) {
      if (selectedRole?.id === undefined)
        throw new Error("No se pudo realizar la consulta");

      updateRole({ role: data, id: selectedRole.id });
      return;
    }

    createRole(data);
  };

  const onCloseModal = () => {
    setShowModalForm(false);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && selectedRole) {
      reset({
        name: selectedRole.name,
      });
    } else {
      reset({ name: "" }); // limpia el form al crear
    }
  }, [isEditing, selectedRole]);

  useEffect(() => {
    setShowModalForm(false);
    if (isUpdated && isEditing) {
      setIsEditing(false);
    }
  }, [isUpdated, isDeleted, isCreated]);

  if (isLoading) return <div>Cargando roles...</div>;
  if (isError) return <div>Error al cargar roles</div>;

  return (
    <>
      <RouteHeader
        routeHeader="Roles"
        routeSubHeader="Gestión de roles del sistema"
        customButtonProps={{
          bg: "blue",
          textContent: "Add New Role",
          icon: "AddIcon",
          type: "button",
          onModalOpen: () => setShowModalForm(true),
        }}
      />

      <Table search={false}>
        <thead className={tableStyles.tableHead}>
          <tr className={tableStyles.tableRow}>
            <th className={tableStyles.tableHeadItem}>ID</th>
            <th className={tableStyles.tableHeadItem}>Nombre</th>
            <th className={tableStyles.tableHeadItem}>Fecha de Creacion</th>
            <th className={tableStyles.tableHeadItem}>Fecha de actualizacion</th>
            <th className={tableStyles.tableHeadItem}>Rason de Desactivacion</th>
            <th className={tableStyles.tableHeadItem}>Estado</th>
            <th className={tableStyles.tableHeadItem}>Actions</th>
          </tr>
        </thead>

        <tbody className={tableStyles.tableBody}>
          {roles &&
            roles.map((role) => (
              <tr className={tableStyles.tableRow} key={role.id}>
                <td className={tableStyles.tableData}>{role.id}</td>
                <td className={tableStyles.tableData}>{role.name}</td>
                <td className={tableStyles.tableData}>
                  {role.createdAt
                    ? parseToDate(role.createdAt)
                    : "Sin Fecha de creacion"}
                </td>
                <td className={tableStyles.tableData}>
                  {role.updatedAt
                    ? parseToDate(role.updatedAt)
                    : "Sin actualizacion"}
                </td>
                <td className={tableStyles.tableData}>
                  {role.desactivationReason ?? "Empty"}
                </td>
                <td className={`${tableStyles.tableData} `}>
                  <span
                    className={`${tableStyles.status} ${role.isActive && tableStyles.active}`}
                  >
                    {role.isActive ? "Activo" : "No Activo"}
                  </span>
                </td>
                <td className={tableStyles.tableActions}>
                  <button
                    className={tableStyles.tableEditAction}
                    onClick={(e) => {
                      onEdit?.(role);
                    }}
                  >
                    <Icons.EditIcon />
                  </button>
                  <button
                    className={tableStyles.tableDeleteAction}
                    onClick={() => onDelete?.(role.id)}
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
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <legend className={styles.legend}>
            <h3>
              Roles <p>{isEditing ? "Actualizar rol" : "Crear nuevo rol"}</p>
            </h3>
          </legend>

          <div className={formStyles.formBody}>
            <div className={styles.formField}>
              <label htmlFor="name" className={styles.label}>
                Nombre del rol{" "}
                <span className={styles.error}>{errors.name?.message}</span>
              </label>
              <input
                type="text"
                placeholder="Example: Admin"
                {...register("name", {
                  required: "Este campo es requerido",
                })}
              />
            </div>
          </div>

          <div className={formStyles.formActions}>
            <CustomButton
              bg="blue"
              textContent={isEditing ? "Actualizar rol" : "Crear nuevo rol"}
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
