import RouteHeader from "~/shared/components/routeHeader/RouteHeader";
import type { Route } from "./+types/Roles";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clinic Managment - Home" },
    { name: "description", content: "Clinic Management Dashboard" },
  ];
}


export default function Roles() {
  
  return (
    <>
      <RouteHeader 
        routeHeader="Roles"
        routeSubHeader="Add New Role"
        customButtonProps={{
          bg: "blue",
          textContent: "Add New Role",
          icon: "add"
        }}
      />
    </>
  );
}
