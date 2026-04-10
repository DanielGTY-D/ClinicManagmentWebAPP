import { useQuery } from "@tanstack/react-query";
import styles from "./Users.module.css";
import RouteHeader from "~/shared/components/routeHeader/RouteHeader";
import Icons from "~/shared/icons/Icons";
import useUsers from "~/features/users/hooks/useUsers";
import type { userResponse } from "~/features/users/types";
import { parseToDate } from "~/shared/utils/parseDate";

export default function Users() {
  const { getAllUsers } = useUsers()
  const { data, isError, isLoading, isSuccess, error } = useQuery<userResponse[]>({
    queryKey: ["users"],
    queryFn: getAllUsers,
    retry: 2
  })



  const onEdit = (user: userResponse) => { }
  const onDelete = (userId: number) => { }

  if (isError) return <p>Error al cargar usuarios</p>
  if (isLoading) return <p>Cargando usuarios</p>

  return (
    <>
      <RouteHeader
        routeHeader="Users"
        routeSubHeader="Gestion de usuarios del sistema"
        customButtonProps={{
          bg: "blue",
          icon: "AddIcon",
          textContent: "New User",
          isLink: false,
        }}
      />

      <div className={styles.usersTable}>
        <div className={styles.header}>
          <div className={styles.search}>
            <input
              className={styles.inputSearch}
              type="search"
              placeholder="Buscar Usuarios"
              name="search"
              id="search"
            />
            <i className={styles.iconSearch}>
              <Icons.searchIcon />
            </i>
          </div>
          <select className={styles.filters} name="filters">
            <option value={"all"}>todos los roles</option>
            <option value={"admin"}>todos los administradores</option>
            <option value={"patient"}>todos los pacientes</option>
            <option value={"doctor"}>todos los doctores</option>
          </select>
        </div>

        <div className={styles.tableContent}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr className={styles.tableRow}>
                <th className={styles.tableHeadItem}>Usuario</th>
                <th className={styles.tableHeadItem}>ROl</th>
                <th className={styles.tableHeadItem}>ESTADO</th>
                <th className={styles.tableHeadItem}>CREADO</th>
                <th className={styles.tableHeadItem}>ACTUALIZADO</th>
                <th className={styles.tableHeadItem}>ULTIMO ACCESO</th>
                <th className={styles.tableHeadItem}>ACCIONES</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {
                isSuccess && (
                  data.map(user => (
                    <tr className={styles.tableRow} key={user.createdAt}>
                      <td className={styles.tableData}>{user.firstName} {user.lastName}</td>
                      <td className={`${styles.tableData}`}>
                        <p className={`${styles[user.role.name]} ${styles.role}`}>{user.role.name}</p>
                      </td>
                      <td className={styles.tableData}>
                        <p className={`${styles.status} ${user.isActive ? styles.active : styles.inactive}`}>{user.isActive ? "Activo" : "Inactivo"}</p>
                      </td>
                      <td className={styles.tableData}>{user.createdAt ? parseToDate(user.createdAt) : "No hay informacion para mostrar"}</td>
                      <td className={styles.tableData}>{user.updatedAt ? parseToDate(user.updatedAt) : "Sin actualizaciones"}</td>
                      <td>Pendiente</td>
                      <td>
                        <button
                          className={styles.tableEditAction}
                          onClick={() => {
                            onEdit?.(user);
                          }}
                        >
                          <Icons.EditIcon />
                        </button>
                        <button
                          className={styles.tableDeleteAction}
                          onClick={() => onDelete?.(user.id)}
                        >
                          <Icons.DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
