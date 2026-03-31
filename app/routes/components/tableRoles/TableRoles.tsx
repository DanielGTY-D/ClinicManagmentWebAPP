import type { rolesType, roleResponse } from "~/types/responses/role/role";
import styles from "./TableRoles.module.css";
import { parseToDate } from "~/shared/utils/parseDate";
import { useAppStore } from "~/shared/stores/useAppStore";

type TableRolesProps = {
  roles?: rolesType;
};

export default function TableRoles({ roles }: TableRolesProps) {
  const setActiveModal = useAppStore((state) => state.setActivateModal);


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
          {roles && roles.map((role) => (
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
              <td className={styles["table-data"]}>
                {role.isDeleted === false ? "No Eliminado" : "Eliminado"}
              </td>
              {/* este lo voy a sacar */}
              <td className={styles["table-data"]} data-status={role.isActive}>
                <span>{role.isActive ? "Activo" : "No Activo"}</span>
              </td>
              <td className={styles["table-actions"]}>
                <button
                  className={styles["table-action-edit"]}
                  onClick={(e) => {
                    setActiveModal(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-pencil h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                    <path d="m15 5 4 4"></path>
                  </svg>
                </button>
                <button className={styles["table-action-delete"]}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-trash h-4 w-4 text-destructive"
                    aria-hidden="true"
                  >
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                    <path d="M3 6h18"></path>
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
