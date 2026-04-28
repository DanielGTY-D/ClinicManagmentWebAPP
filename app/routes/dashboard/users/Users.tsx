import type { userResponse } from "~/features/users/types";
import styles from "./Users.module.css";
import formStyles from "~/shared/styles/DumbModalBody.module.css"
import tableStyles from "~/shared/styles/TableBody.module.css";
import RouteHeader from "~/shared/components/routeHeader/RouteHeader";
import useUsers from "~/features/users/hooks/useUsers";
import DumbModal from "~/shared/components/dumbModal/DumbModal";
import CustomButton from "~/shared/components/customButton/CustomButton";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { useRoles } from "~/features/roles/hooks/useRoles";
import Table, { type Filters } from "~/shared/components/table/Table";
import { parseToDate } from "~/shared/utils/parseDate";
import Icons from "~/shared/icons/Icons";

interface Inputs {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roleId: number;
}

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<userResponse>();
  const [showModalForm, setShowModalForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [inputFilters, setInputFilters] = useState<string>("");
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
    isUpdating,
  } = useUsers();
  const { roles } = useRoles();
  const cloudinary = import.meta.env.VITE_CLAUDINARY_URL;

  let filteredUsers = useMemo(() => {
    if (inputSearch?.length > 0) {
      return users.filter((user) =>
        user.username
          .trim()
          .toLowerCase()
          .startsWith(inputSearch.trim().toLowerCase()),
      );
    } else if (inputFilters.length > 0) {
      return inputFilters !== "all"
        ? users.filter(
            (user) =>
              user.role?.name.trim().toLowerCase() ===
              inputFilters.trim().toLowerCase(),
          )
        : users;
    } else {
      return users;
    }
  }, [users, inputFilters, inputSearch]);


  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onEdit = (user: userResponse) => {
    setIsEditing(true);
    setShowModalForm(true);
    setSelectedUser(user);
    reset();
  };

  const onDelete = (userId: number) => {};
  const onSubmit = (data: Inputs) => {
    updateUser({ id: selectedUser!.id.toString(), data });
  };

  const filters: Filters[] = [
    {
      text: "Todos los Usuarios",
      value: "all",
    },
    {
      text: "Todos los Administradores",
      value: "admin",
    },
    {
      text: "Todos los Doctores",
      value: "doctor",
    },
    {
      text: "Todos los Pacientes",
      value: "patient",
    },
  ];

  useEffect(() => {
    setShowModalForm(false);
  }, [isUpdating]);

  useEffect(() => {
    if (isEditing && selectedUser) {
      reset({
        roleId: selectedUser?.role!.id,
      });
    }
  }, [isEditing, selectedUser]);

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
        <Table<userResponse>
          filters={filters}
          onSearch={setInputSearch}
          search={true}
          onFilter={setInputFilters}
          inputFilter={inputFilters}
          inputSearch={inputSearch}
        >
          <thead className={tableStyles.tableHead}>
            <tr className={tableStyles.tableRow}>
              <th className={tableStyles.tableHeadItem}>PROFILE</th>
              <th className={tableStyles.tableHeadItem}>Usuario</th>
              <th className={tableStyles.tableHeadItem}>ROl</th>
              <th className={tableStyles.tableHeadItem}>ESTADO</th>
              <th className={tableStyles.tableHeadItem}>ASIGNADO</th>
              <th className={tableStyles.tableHeadItem}>CREADO</th>
              <th className={tableStyles.tableHeadItem}>ACTUALIZADO</th>
              <th className={tableStyles.tableHeadItem}>ULTIMO ACCESO</th>
              <th className={tableStyles.tableHeadItem}>ACCIONES</th>
            </tr>
          </thead>
          <tbody className={tableStyles.tableBody}>
            {filteredUsers &&
              filteredUsers.map((user) => (
                <tr className={tableStyles.tableRow} key={user.createdAt}>
                  <td className={tableStyles.tableData}>
                    <img
                      className={tableStyles.userProfileImage}
                      src={`${cloudinary}/${user.imageProfile}`}
                    />
                  </td>
                  <td className={tableStyles.tableData}>{user.username}</td>
                  <td className={`${tableStyles.tableData}`}>
                    <p className={`${tableStyles[user.role!.name]} ${tableStyles.role}`}>
                      {user.role!.name}
                    </p>
                  </td>
                  <td className={tableStyles.tableData}>
                    <p
                      className={`${tableStyles.status} ${user.isActive ? tableStyles.active : tableStyles.inactive}`}
                    >
                      {user.isActive ? "Activo" : "Inactivo"}
                    </p>
                  </td>
                  <td className={tableStyles.tableData}>
                    <p>{user.isAssigned ? "Asignado" : "No Asignado"}</p>
                  </td>
                  <td className={tableStyles.tableData}>
                    <p>
                      {user.createdAt
                        ? parseToDate(user.createdAt)
                        : "No hay informacion para mostrar"}
                    </p>
                  </td>
                  <td className={tableStyles.tableData}>
                    <p>
                      {user.updatedAt
                        ? parseToDate(user.updatedAt)
                        : "Sin actualizaciones"}
                    </p>
                  </td>
                  <td>Pendiente</td>
                  <td className={tableStyles.tableDataActions}>
                    <button
                      className={tableStyles.tableEditAction}
                      onClick={() => {
                        onEdit?.(user);
                      }}
                    >
                      <Icons.EditIcon />
                    </button>
                    <button
                      className={tableStyles.tableDeleteAction}
                      onClick={() => onDelete?.(user.id)}
                    >
                      <Icons.DeleteIcon />
                    </button>
                    {!user.isAssigned && (
                      <button className={tableStyles.tableAssingAction}>
                        <i className={tableStyles.assingIcon}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            id="add-user"
                          >
                            <path d="M25.71118,34.71187A14.83144,14.83144,0,0,0,40.52545,19.89712C39.7112.24471,11.70817.25044,10.89689,19.89723A14.83146,14.83146,0,0,0,25.71118,34.71187Zm0-27.62782A12.82793,12.82793,0,0,1,38.52475,19.89712C37.82111,36.89674,13.59866,36.8918,12.8976,19.897A12.82793,12.82793,0,0,1,25.71118,7.08405Z"></path>
                            <path d="M25.71118 36.19481a21.74618 21.74618 0 00-21.721 21.72147 1.00009 1.00009 0 001.00035 1.00035H46.43181a.99978.99978 0 001.00035-1.00035A21.74586 21.74586 0 0025.71118 36.19481zm0 2.0007a19.72829 19.72829 0 0119.6696 18.72042H6.04159A19.728 19.728 0 0125.71118 38.19551zM59.00945 32.71117H50.81811V24.52179a1.00055 1.00055 0 00-2.0007.00006v8.18932H40.628a1.00035 1.00035 0 000 2.0007h8.18939v8.18841a1.00035 1.00035 0 002.0007 0V34.71187h8.19134A1.00055 1.00055 0 0059.00945 32.71117z"></path>
                          </svg>
                        </i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}

      {isEditing && selectedUser && (
        <DumbModal show={showModalForm}>
          <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
            <legend className={formStyles.legend}>
              <h4>
                Usuarios
                <p>Crear un nuevo usuario</p>
              </h4>
              <span
                onClick={() => {
                  setShowModalForm(false);
                }}
              >
                Cerrar
              </span>
            </legend>

            <div className={formStyles.formBody}>
              <div className={formStyles.formField}>
                <label htmlFor="username">
                  Nombre de usuario <span>{errors.username?.message}</span>
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Oscar palacions"
                  {...register("username", {
                    required: "Este campo no puede estar vacio",
                    value: selectedUser.username,
                  })}
                />
              </div>

              <div className={formStyles.formField}>
                <label htmlFor="email">
                  Correo electronico <span>{errors.email?.message}</span>
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Oscar palacions"
                  {...register("email", {
                    required: "Este campo no puede estar vacio",
                    value: selectedUser.email,
                  })}
                />
              </div>

              <div className={formStyles.formField}>
                <label htmlFor="firstName">
                  Nombres <span>{errors.firstName?.message}</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Oscar palacions"
                  {...register("firstName", {
                    required: "Este campo no puede estar vacio",
                    value: selectedUser.firstName,
                  })}
                />
              </div>

              <div className={formStyles.formField}>
                <label htmlFor="lastName">
                  Apellidos <span>{errors.lastName?.message}</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Oscar palacions"
                  {...register("lastName", {
                    required: "Este campo no puede estar vacio",
                    value: selectedUser.lastName,
                  })}
                />
              </div>

              <div className={formStyles.formField}>
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
                    <option key={role.id} value={role.id}>
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
