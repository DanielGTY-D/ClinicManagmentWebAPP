import RouteHeader from "~/shared/components/routeHeader/RouteHeader";
import type { Route } from "./+types/Roles";
import { useQuery } from "@tanstack/react-query";
import useRoleData from "~/shared/hooks/useRoleData";
import TableRoles from "./components/tableRoles/TableRoles";
import RoleModal from "~/shared/components/modal/RoleModal";
import { useAppStore } from "~/shared/stores/useAppStore";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clinic Managment - Roles" },
    { name: "description", content: "Role Management" },
  ];
}


export default function Roles() {
  const { getAll, post } = useRoleData();
  const { isModalOpen, roleData, setActivateModal, setRoleData } = useAppStore(
    (state) => ({
      isModalOpen: state.isModalOpen,
      roleData: state.roleData,
      setActivateModal: state.setActivateModal,
      setRoleData: state.setRoleData,
    })
  );

  const { data: roles, isLoading, error, refetch } = useQuery({
    queryKey: ["roles"],
    queryFn: getAll,
  });

  const handleSave = async (data: { name: string }) => {
    try {
      await post(data);
      setActivateModal(false);
      setRoleData(null);
      await refetch();
    } catch (err) {
      throw err;
    }
  };

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
      <TableRoles 
        roles={roles} 
        onEdit={(role: any) => {
          setRoleData({ name: role.name });
          setActivateModal(true);
        }}
      />
      <RoleModal
        isOpen={isModalOpen}
        onClose={() => {
          setActivateModal(false);
          setRoleData(null);
        }}
        onSave={handleSave}
        initialData={roleData ?? undefined}
      />
    </>
  );
}
