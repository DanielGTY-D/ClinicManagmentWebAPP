import { NavLink, Outlet, useNavigate } from "react-router";
import styles from "./MainLayout.module.css";
import Sidebar from "~/shared/components/sideBar/SideBar";
import Notification from "~/shared/components/notification/Notification";
import Button from "~/shared/components/button/Button";
import useUsers from "~/features/users/hooks/useUsers";
import { getTokenPayload, type TokenPayload } from "~/shared/utils/jwtDecode";
import { useAppStore } from "~/shared/stores/useAppStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function MainLayout() {
  const navigate = useNavigate();
  const { getUserById } = useUsers();

  const [tokenPayload, setTokenPayload] = useState<TokenPayload | null>(null);
  const setUserData = useAppStore((state) => state.setUserData);

  const query = useQuery({
    queryKey: ["user", tokenPayload?.sub],
    queryFn: () => getUserById(tokenPayload?.sub!),
    enabled: tokenPayload !== null,
  });

  const onCloseSession = () => {
    localStorage.removeItem("TOKEN");
  };

  useEffect(() => {
    const tokenData = getTokenPayload();

    if (!tokenData) {
      navigate("/");
    }

    setTokenPayload(tokenData);

    if (query.isFetched && query.data) {
      setUserData(query.data);
    }
  }, [query.isFetched]);

  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.content}>
        <header className={styles.header}>
          <button
            className={styles["toggle-sidebar"]}
            aria-label="toggle-sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-panel-left"
              aria-hidden="true"
            >
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M9 3v18"></path>
            </svg>
          </button>
          <NavLink className={styles.backToHome} to={"/"}>
            Ir al incio
          </NavLink>
          <Button
            route=""
            styleType="gradient"
            textContent="Cerrar sesion"
            customFn={onCloseSession}
          />
        </header>

        <div className={styles["outlet-container"]}>
          <Outlet />
        </div>

        {/* <Notification /> */}
        <ToastContainer />
      </div>
    </div>
  );
}
