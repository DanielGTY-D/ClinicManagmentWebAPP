import RouteHeader from "~/shared/components/routeHeader/RouteHeader";
import type { Route } from "./+types/Roles";
import { useQuery } from "@tanstack/react-query";
import useRoleData from "~/shared/hooks/useRoleData";
import TableRoles from "./components/tableRoles/TableRoles";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clinic Managment - Roles" },
    { name: "description", content: "Role Management" },
  ];
}


export default function Roles() {
  const { getAll } = useRoleData();

  const { data: roles, isLoading, error } = useQuery({
    queryKey: ["roles"],
    queryFn: getAll,
  });

  if (isLoading) return <div>Cargando roles...</div>;
  if (error) return <div>Error al cargar roles</div>;

  return (
    <>
      <RouteHeader 
        routeHeader="Roles"
        routeSubHeader="Gestión de roles del sistema"
        customButtonProps={{
          bg: "blue",
          textContent: "Add New Role",
          icon: "add"
        }}
      />
      <TableRoles roles={roles} />
    </>
  );
}
