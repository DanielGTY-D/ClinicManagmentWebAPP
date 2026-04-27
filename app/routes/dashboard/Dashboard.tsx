import type { Route } from "./+types/Dashboard";
import styles from "./Dashboard.module.css";
import { getTokenPayload, type TokenPayload } from "~/shared/utils/jwtDecode";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import UserDashboardPanel from "~/features/dashboard/components/userDashboardPanel/UserDashboardPanel";
import AdminDashboardPanel from "~/features/dashboard/components/adminDashboardPanel/AdminDashboardPanel";
import useUsers from "~/features/users/hooks/useUsers";
import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "~/shared/stores/useAppStore";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clinic Managment - Dashboard" },
    { name: "description", content: "Clinic Management Dashboard" },
  ];
}

export default function Dashboard() {
  const [tokenPayload, setTokenPayload] = useState<TokenPayload | null>(null);
  const navigate = useNavigate();

  const role = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

  

  useEffect(() => {
    const tokenData = getTokenPayload();

    if (!tokenData) {
      navigate("/");
    }

    setTokenPayload(tokenData);

  }, []);

  if (tokenPayload) null;

  if (tokenPayload?.[role] === "patient") return <UserDashboardPanel />;
  if (tokenPayload?.[role] !== "patient") return <AdminDashboardPanel />;
}
