import type { Route } from "./+types/Roles";
import type { roleResponse } from "~/features/roles/types/role";
import styles from "./Role.module.css";
import RouteHeader from "~/shared/components/routeHeader/RouteHeader";
import TableRoles from "~/features/roles/components/tableRoles/TableRoles";
import DumbModal from "~/shared/components/dumbModal/DumbModal";
import CustomButton from "~/shared/components/customButton/CustomButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRoles } from "~/features/roles/hooks/useRoles";

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
  const { roles, createRole, updateRole, deleteRole, isLoading, isError } = useRoles();
  const [showModalForm, setShowModalForm] = useState(false);
  const [roleId, setRoleId] = useState<number>();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RolesInputs>();


  const onEditRole = (role: roleResponse) => {
    setIsEditing(true);
    setRoleId(role.id);
    setShowModalForm(true);
  };

  const onDeleteRole = (id: number) => {
    deleteRole(id);
  };

  const onSubmit = (data: RolesInputs) => {
    if (isEditing) {
      if (roleId === undefined)
        throw new Error("No se pudo realizar la consulta");

      updateRole({ role: data, id: roleId });
      return;
    }

    createRole(data);
  };

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
      <TableRoles roles={roles} onEdit={onEditRole} onDelete={onDeleteRole} />

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
                  required: {
                    message: "Este campo es requerido",
                    value: isEditing ?? "" 
                  }
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
              onModalOpen={() => setShowModalForm(false)}
            />
          </div>
        </form>
      </DumbModal>
    </>
  );
}
