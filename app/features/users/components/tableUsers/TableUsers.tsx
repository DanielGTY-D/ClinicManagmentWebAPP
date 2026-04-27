import { parseToDate } from "~/shared/utils/parseDate";
import styles from "./TableUsers.module.css";
import Icons from "~/shared/icons/Icons";
import type { userResponse } from "../../types";
import { useEffect, useState, type ChangeEvent } from "react";

interface TableUsersProps {
  isFetchOk: boolean;
  data: userResponse[];
  onDelete: (id: number) => void;
  onEdit: (data: userResponse) => void;
}

export default function TableUsers({
  data,
  isFetchOk,
  onDelete,
  onEdit,
}: TableUsersProps) {
  const [filteredUsers, setFilteredUsers] = useState<userResponse[]>(data);
  const cloudinary = import.meta.env.VITE_CLAUDINARY_URL;

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const filtered = data.filter((item) => {
      if (item.username.toLowerCase().startsWith(value)) {
        return item;
      }
    });

    setFilteredUsers(filtered);
  };

  const handleFilterByRole = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    const filtered = data.filter((item) => {
      if (item.role.name.toLowerCase() === value) {
        return item;
      }
      if (value === "all") {
        return item;
      }
    });

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    setFilteredUsers(data);
  }, [data])

  return (
    <>
      <div className={styles.usersTable}>
        <div className={styles.header}>
          <div className={styles.search}>
            <input
              className={styles.inputSearch}
              type="search"
              placeholder="Buscar Usuarios"
              name="search"
              id="search"
              onChange={handleSearchInput}
            />
            <i className={styles.iconSearch}>
              <Icons.searchIcon />
            </i>
          </div>
          <select
            className={styles.filters}
            name="filters"
            onChange={handleFilterByRole}
          >
            <option value={"all"}>todos los Usuarios</option>
            <option value={"admin"}>todos los Administradores</option>
            <option value={"patient"}>todos los Pacientes</option>
            <option value={"doctor"}>todos los Doctores</option>
          </select>
        </div>

        <div className={styles.tableContent}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr className={styles.tableRow}>
                <th className={styles.tableHeadItem}>PROFILE</th>
                <th className={styles.tableHeadItem}>Usuario</th>
                <th className={styles.tableHeadItem}>ROl</th>
                <th className={styles.tableHeadItem}>ESTADO</th>
                <th className={styles.tableHeadItem}>ASIGNADO</th>
                <th className={styles.tableHeadItem}>CREADO</th>
                <th className={styles.tableHeadItem}>ACTUALIZADO</th>
                <th className={styles.tableHeadItem}>ULTIMO ACCESO</th>
                <th className={styles.tableHeadItem}>ACCIONES</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {isFetchOk &&
                filteredUsers.map((user) => (
                  <tr className={styles.tableRow} key={user.createdAt}>
                    <td className={styles.tableData}>
                      <img
                        className={styles.userProfileImage}
                        src={`${cloudinary}/${user.imageProfile}`}
                      />
                    </td>
                    <td className={styles.tableData}>{user.username}</td>
                    <td className={`${styles.tableData}`}>
                      <p className={`${styles[user.role.name]} ${styles.role}`}>
                        {user.role.name}
                      </p>
                    </td>
                    <td className={styles.tableData}>
                      <p
                        className={`${styles.status} ${user.isActive ? styles.active : styles.inactive}`}
                      >
                        {user.isActive ? "Activo" : "Inactivo"}
                      </p>
                    </td>
                    <td className={styles.tableData}>
                      <p>{user.isAssigned ? "Asignado" : "No Asignado"}</p>
                    </td>
                    <td className={styles.tableData}>
                      <p>
                        {user.createdAt
                          ? parseToDate(user.createdAt)
                          : "No hay informacion para mostrar"}
                      </p>
                    </td>
                    <td className={styles.tableData}>
                      <p>
                        {user.updatedAt
                          ? parseToDate(user.updatedAt)
                          : "Sin actualizaciones"}
                      </p>
                    </td>
                    <td>Pendiente</td>
                    <td className={styles.tableDataActions}>
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
                      {!user.isAssigned && (
                        <button className={styles.tableAssingAction}>
                          <i className={styles.assingIcon}>
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
          </table>
        </div>
      </div>
    </>
  );
}
