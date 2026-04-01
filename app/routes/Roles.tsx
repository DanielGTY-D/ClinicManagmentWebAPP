import RouteHeader from "~/shared/components/routeHeader/RouteHeader";
import type { Route } from "./+types/Roles";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import useRoleData from "~/shared/hooks/useRoleData";
import TableRoles from "./components/tableRoles/TableRoles";
import Modal from "~/shared/components/modal/RoleModal";
import { useAppStore } from "~/shared/stores/useAppStore";
import type { roleResponse } from "~/types/responses/role/role";
import { useState } from "react";
import type { RoleRequest } from "~/types/request/role";
import axios from "axios";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clinic Managment - Roles" },
    { name: "description", content: "Role Management" },
  ];
}

export default function Roles() {
  const { getAll, post, put, remove } = useRoleData();
  const queryClient = useQueryClient();
  const isModalOpen = useAppStore((state) => state.isModalOpen);
  const setToggleModal = useAppStore((state) => state.setToggleModal);
  const [idRole, setIdRole] = useState<number>();
  const [isEditing, setIsEditing] = useState(false);
  const [roleData, setRoleData] = useState<RoleRequest>({
    name: "",
  });

  const {
    data: roles,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: getAll,
    retry: false,
  });

  const createRole = useMutation({
    mutationFn: post,
    onSuccess: (data) => {
      console.log("Rol Creado Correctamente");
      queryClient.invalidateQueries({queryKey: ["roles"]})
      setRoleData({name: ""})
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.headers.errors);
      }
    },
  });

  const updateRole = useMutation({
    mutationFn: ({ id, role }: { role: RoleRequest; id: number }) =>
      put(role, id),
    onSuccess: (data) => {
      console.log("Rol actualizado correctamente");
      queryClient.invalidateQueries({queryKey: ["roles"]})
      setRoleData({name: ""})
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.errors);
        console.log(error.response?.status);
      }
      console.log(error);
    },
  });

  const deleteRole = useMutation({
    mutationFn: (id: number) => remove(id),
    onSuccess: (data) => {
      console.log("Rol eliminado correctamente");
      queryClient.invalidateQueries({queryKey: ["roles"]})
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.errors);
        console.log(error.response?.status);
      }
      console.log(error);
    },
  });

  const onToggelModal = () => {
    setToggleModal(!isModalOpen);
  };

  const onEditRole = (role: roleResponse) => {
    setToggleModal(true);
    setRoleData({ name: role.name });
    setIsEditing(true);
    setIdRole(role.id);
  };

  const onDeleteRole = (id: number) => {
    deleteRole.mutate(id);
  };

  const onSaveRole = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEditing) {
      if (idRole) updateRole.mutate({ role: roleData, id: idRole });

      return;
    }

    createRole.mutate(roleData);
  };

  const onChangeRoleField = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    setRoleData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fields = [
    {
      id: "roleName",
      name: "name",
      labelText: "Nombre del role",
      inputValue: roleData.name,
      placeholder: "Ingresa el nombre del role",
    },
  ];

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
          icon: "AddIcon",
          type: "button",
          onModalOpen: onToggelModal,
        }}
      />
      <TableRoles roles={roles} onEdit={onEditRole} onDelete={onDeleteRole} />
      <Modal
        isOpen={isModalOpen}
        onClose={onToggelModal}
        onSave={onSaveRole}
        modalBody={{
          title: "Roles",
          subTitle: isEditing ? "Actualizar el rol" : "Crea un nuevo rol",
          fields,
        }}
        onChange={onChangeRoleField}
      />
    </>
  );
}
