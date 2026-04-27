import type { userResponse } from "~/features/users/types";
import RouteHeader from "~/shared/components/routeHeader/RouteHeader";
import useUsers from "~/features/users/hooks/useUsers";
import DumbModal from "~/shared/components/dumbModal/DumbModal";
import CustomButton from "~/shared/components/customButton/CustomButton";
import TableUsers from "~/features/users/components/tableUsers/TableUsers";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRoles } from "~/features/roles/hooks/useRoles";

interface Inputs {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roleId: number;
}

export default function Users() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showModalForm, setShowModalForm] = useState(false);
  const {
    users,
    isUsersLoding,
    isUsersError,
    isUsersSuccess,
    user,
    isUserLoading,
    isUserSuccess,
    updateUser,
    isUpdated,
    isUpdating
  } = useUsers(selectedUserId);
  const { roles } = useRoles();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onEdit = (user: userResponse) => {
    setShowModalForm(true);
    setSelectedUserId(user.id.toString());
    reset();
  };

  const onDelete = (userId: number) => {};
  const onSubmit = (data: Inputs) => {
    const obj = {
      ...data,
    };
    updateUser({ id: selectedUserId!, data: obj });
  };

  useEffect(() => {
    setShowModalForm(false);
  }, [isUpdating]);

  if (isUsersError) return <p>Error al cargar usuarios</p>;
  if (isUsersLoding) return <p>Cargando usuarios</p>;

  return (
    <>
      <RouteHeader
        routeHeader="Users"
        routeSubHeader="Gestion de usuarios del sistema"
        customButtonProps={{
          bg: "blue",
          icon: "AddIcon",
          textContent: "New User",
          isLink: true,
          route: "/auth/register",
        }}
      />

      {isUsersSuccess && (
        <TableUsers
          data={users}
          isFetchOk={isUsersSuccess}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}

      {user && (
        <DumbModal show={showModalForm}>
          <form data-form onSubmit={handleSubmit(onSubmit)}>
            <legend data-form-legend>
              <h4>
                Usuarios
                <p>Crear un nuevo usuario</p>
              </h4>
              <span onClick={() => setShowModalForm(false)}>Cerrar</span>
            </legend>

            <div data-form-body>
              <div data-form-field>
                <label htmlFor="username">
                  Nombre de usuario <span>{errors.username?.message}</span>
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Oscar palacions"
                  {...register("username", {
                    required: "Este campo no puede estar vacio",
                    value: user.username,
                  })}
                />
              </div>

              <div data-form-field>
                <label htmlFor="email">
                  Correo electronico <span>{errors.email?.message}</span>
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Oscar palacions"
                  {...register("email", {
                    required: "Este campo no puede estar vacio",
                    value: user.email,
                  })}
                />
              </div>

              <div data-form-field>
                <label htmlFor="firstName">
                  Nombres <span>{errors.firstName?.message}</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Oscar palacions"
                  {...register("firstName", {
                    required: "Este campo no puede estar vacio",
                    value: user.firstName,
                  })}
                />
              </div>

              <div data-form-field>
                <label htmlFor="lastName">
                  Apellidos <span>{errors.lastName?.message}</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Oscar palacions"
                  {...register("lastName", {
                    required: "Este campo no puede estar vacio",
                    value: user.lastName,
                  })}
                />
              </div>

              <div data-form-field>
                <label htmlFor="lastName">
                  Apellidos <span>{errors.lastName?.message}</span>
                </label>
                <select
                  id="role"
                  {...register("roleId", {
                    required: "Este camp es requerido",
                  })}
                >
                  {roles.map((role) => (
                    <option
                      key={role.id}
                      value={role.id}
                      selected={role.name === user.role.name}
                    >
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <CustomButton
              bg="blue"
              textContent="Actualizar usuario"
              icon=""
              type="submit"
            />
          </form>
        </DumbModal>
      )}
    </>
  );
}
