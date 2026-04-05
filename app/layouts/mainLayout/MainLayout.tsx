import { Outlet } from "react-router";
import styles from "./MainLayout.module.css";
import Sidebar from "~/shared/components/sideBar/SideBar";
import Footer from "~/shared/components/footer/Footer";

export default function MainLayout() {
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
        </header>

        <div className={styles["outlet-container"]}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
