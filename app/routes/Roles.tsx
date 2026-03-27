import { useQuery } from "@tanstack/react-query";
import type { Route } from "./+types/Roles";
import useFetchRoleData from "~/shared/hooks/useFetchRoleData";
import RouteHeader from "~/components/routeHeader/RouteHeader";
import InputSearch from "~/components/inputSearch/InputSearch";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clinic Managment - Home" },
    { name: "description", content: "Clinic Management Dashboard" },
  ];
}

export default function Roles() {
  const { getRoles } = useFetchRoleData();
  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
    retry: 2,
  });

  console.log(data, error);

  return (
    <>
      <RouteHeader
        title="Roles"
        description="Maneja tus roles de usuario"
        buttonName="Add New Role"
      />

      <InputSearch />

      <div>
        {isLoading && <p>Loading...</p>}
        {isSuccess &&
          data &&
          data.map((role) => (
            <>
              <li>{role.id}</li>
              <li>{role.name}</li>
            </>
          ))}
      </div>
    </>
  );
}
