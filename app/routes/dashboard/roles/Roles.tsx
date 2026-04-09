import type { Route } from "./+types/Roles";
import RouteHeader from "~/shared/components/routeHeader/RouteHeader";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import useRoleData from "~/features/roles/hooks/useRoleData";
import TableRoles from "~/features/roles/components/tableRoles/TableRoles";
import Modal from "~/shared/components/modal/RoleModal";
import { useAppStore } from "~/shared/stores/useAppStore";
import type { roleResponse } from "~/features/roles/types/role";
import { useEffect, useState } from "react";
import type { RoleRequest } from "~/features/roles/types/role";
import axios from "axios";
import { useNavigate } from "react-router";
import { JWTDecode, type CustomPayload } from "~/shared/utils/jwtDecode";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clinic Managment - Roles" },
    { name: "description", content: "Role Management" },
  ];
}

export default function Roles() {
  const { getAll, post, put, remove } = useRoleData();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isModalOpen = useAppStore((state) => state.isModalOpen);
  const setToggleModal = useAppStore((state) => state.setToggleModal);
  const setNotificationProps = useAppStore(
    (state) => state.setShowNotificationProps,
  );
  const [tokenPayload, setTokenPayload] = useState<CustomPayload | null>(null);
  const [idRole, setIdRole] = useState<number>();
  const [isEditing, setIsEditing] = useState(false);
  const [roleData, setRoleData] = useState<RoleRequest>({
    name: "",
  });
  const role = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

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
      setNotificationProps({
        message: "Role creado exitosamente",
        state: true,
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      setRoleData({ name: "" });
      setToggleModal(!isModalOpen);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setNotificationProps({
          message: error.response?.data.errors.Name,
          state: true,
          type: "error",
        });
      }
    },
  });

  const updateRole = useMutation({
    mutationFn: ({ id, role }: { role: RoleRequest; id: number }) =>
      put(role, id),
    onSuccess: (data) => {
      setNotificationProps({
        message: "Role actualizado exitosamente",
        state: true,
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      setRoleData({ name: "" });
      setToggleModal(!isModalOpen);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.errors)
        setNotificationProps({
          message: error.response?.data.errors.Name,
          state: true,
          type: "error",
        });
      }
      console.log(error);
    },
  });

  const deleteRole = useMutation({
    mutationFn: (id: number) => remove(id),
    onSuccess: (data) => {
      setNotificationProps({
        message: "Role actualizado exitosamente",
        state: true,
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      setToggleModal(!isModalOpen);
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

  useEffect(() => {
    const tokenData = JWTDecode();

    if (!tokenData) {
      navigate("/");
    }

    setTokenPayload(tokenData);
  }, []);

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
