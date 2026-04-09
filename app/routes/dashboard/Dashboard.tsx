import type { Route } from "./+types/Dashboard";
import styles from "./Dashboard.module.css";
import { JWTDecode, type CustomPayload } from "~/shared/utils/jwtDecode";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import UserDashboardPanel from "~/features/dashboard/userDashboardPanel/UserDashboardPanel";
import AdminDashboardPanel from "~/features/dashboard/adminDashboardPanel/AdminDashboardPanel";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clinic Managment - Dashboard" },
    { name: "description", content: "Clinic Management Dashboard" },
  ];
}



export default function Dashboard() {
  const [tokenPayload, setTokenPayload] = useState<CustomPayload | null>(null);
  const navigate = useNavigate();

  const role = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  

  useEffect(() => {
    const tokenData = JWTDecode();

    if (!tokenData) {
      navigate("/")
    }

    setTokenPayload(tokenData);
  }, []);
  
  if (tokenPayload) null;

  if(tokenPayload?.[role] === "patient") return <UserDashboardPanel />
  if(tokenPayload?.[role] !== "patient") return <AdminDashboardPanel />
}
