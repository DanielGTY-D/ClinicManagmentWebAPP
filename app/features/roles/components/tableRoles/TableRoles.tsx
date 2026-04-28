import type { rolesResponse, roleResponse } from "~/features/roles/types/role";
import styles from "./TableRoles.module.css";
import { parseToDate } from "~/shared/utils/parseDate";
import { useAppStore } from "~/shared/stores/useAppStore";
import Icons from "~/shared/icons/Icons";

type TableRolesProps = {
  roles?: roleResponse[];
  onEdit?: (role: roleResponse) => void;
  onDelete?: (id: number) => void;
};

export default function TableRoles({
  roles,
  onEdit,
  onDelete,
}: TableRolesProps) {
  return (
    <div className={styles["table-container"]}>
      <table className={styles["table"]}>
        <thead className={styles["table-head"]}>
          <tr className={styles["table-row"]}>
            <th className={styles["table-head-item"]}>ID</th>
            <th className={styles["table-head-item"]}>Nombre</th>
            <th className={styles["table-head-item"]}>Fecha de Creacion</th>
            <th className={styles["table-head-item"]}>
              Fecha de actualizacion
            </th>
            <th className={styles["table-head-item"]}>
              Rason de Desactivacion
            </th>
            <th className={styles["table-heade-item"]}>Eliminado</th>
            <th className={styles["table-head-item"]}>Estado</th>
            <th className={styles["table-head-item"]}>Actions</th>
          </tr>
        </thead>

        <tbody className={styles["table-body"]}>
          {roles &&
            roles.map((role) => (
              <tr className={styles["table-row"]} key={role.id}>
                <td className={styles["table-data"]}>{role.id}</td>
                <td className={styles["table-data"]}>{role.name}</td>
                <td className={styles["table-data"]}>
                  {role.createdAt
                    ? parseToDate(role.createdAt)
                    : "Sin Fecha de creacion"}
                </td>
                <td className={styles["table-data"]}>
                  {role.updatedAt
                    ? parseToDate(role.updatedAt)
                    : "Sin actualizacion"}
                </td>
                <td className={styles["table-data"]}>
                  {role.desactivationReason ?? "Empty"}
                </td>
                {/* este lo voy a sacar */}
                <td
                  className={styles["table-data"]}
                  data-status={role.isActive}
                >
                  <span>{role.isActive ? "Activo" : "No Activo"}</span>
                </td>
                <td className={styles["table-actions"]}>
                  <button
                    className={styles["table-action-edit"]}
                    onClick={(e) => {
                      onEdit?.(role);
                    }}
                  >
                    <Icons.EditIcon />
                  </button>
                  <button
                    className={styles["table-action-delete"]}
                    onClick={() => onDelete?.(role.id)}
                  >
                    <Icons.DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
