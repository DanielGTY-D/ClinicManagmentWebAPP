import type { Route } from "./+types/Roles";
import type { roleResponse, rolesResponse } from "~/features/roles/types/role";
import styles from "./Role.module.css";
import RouteHeader from "~/shared/components/routeHeader/RouteHeader";
import DumbModal from "~/shared/components/dumbModal/DumbModal";
import CustomButton from "~/shared/components/customButton/CustomButton";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRoles } from "~/features/roles/hooks/useRoles";
import Table from "~/shared/components/table/Table";
import { parseToDate } from "~/shared/utils/parseDate";
import Icons from "~/shared/icons/Icons";

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
        <thead className={styles.tableHead}>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeadItem}>ID</th>
            <th className={styles.tableHeadItem}>Nombre</th>
            <th className={styles.tableHeadItem}>Fecha de Creacion</th>
            <th className={styles.tableHeadItem}>Fecha de actualizacion</th>
            <th className={styles.tableHeadItem}>Rason de Desactivacion</th>
            <th className={styles.tableHeadItem}>Estado</th>
            <th className={styles.tableHeadItem}>Actions</th>
          </tr>
        </thead>

        <tbody className={styles.tableBody}>
          {roles &&
            roles.map((role) => (
              <tr className={styles.tableRow} key={role.id}>
                <td className={styles.tableData}>{role.id}</td>
                <td className={styles.tableData}>{role.name}</td>
                <td className={styles.tableData}>
                  {role.createdAt
                    ? parseToDate(role.createdAt)
                    : "Sin Fecha de creacion"}
                </td>
                <td className={styles.tableData}>
                  {role.updatedAt
                    ? parseToDate(role.updatedAt)
                    : "Sin actualizacion"}
                </td>
                <td className={styles.tableData}>
                  {role.desactivationReason ?? "Empty"}
                </td>
                <td className={`${styles.tableData} `}>
                  <span
                    className={`${styles.status} ${role.isActive && styles.active}`}
                  >
                    {role.isActive ? "Activo" : "No Activo"}
                  </span>
                </td>
                <td className={styles.tableActions}>
                  <button
                    className={styles.tableEditAction}
                    onClick={(e) => {
                      onEdit?.(role);
                    }}
                  >
                    <Icons.EditIcon />
                  </button>
                  <button
                    className={styles.tableDeleteAction}
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
          data-fomr
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <legend data-form-legend className={styles.legend}>
            <h3>
              Roles <p>{isEditing ? "Actualizar rol" : "Crear nuevo rol"}</p>
            </h3>
          </legend>

          <div data-form-body>
            <div data-form-field className={styles.field}>
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

          <div data-form-actions>
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
