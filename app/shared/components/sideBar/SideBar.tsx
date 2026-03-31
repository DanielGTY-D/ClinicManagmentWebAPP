import React, { useState, type JSX } from "react";
import styles from "./SideBar.module.css";
import { NavLink } from "react-router";

// Icons (using inline SVGs for zero dependencies)
const Icons = {
  logo: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  ),
  dashboard: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  appointments: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
    </svg>
  ),
  users: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <circle cx="9" cy="7" r="4" />
      <path
        d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
        strokeLinecap="round"
      />
      <path
        d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87"
        strokeLinecap="round"
      />
    </svg>
  ),
  roles: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  patients: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a8 8 0 0 1 16 0v1" strokeLinecap="round" />
    </svg>
  ),
  doctors: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a8 8 0 0 1 16 0v1" strokeLinecap="round" />
      <path d="M9 14h6M12 11v6" strokeLinecap="round" />
    </svg>
  ),
  diagnostics: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"
        strokeLinecap="round"
      />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6M9 16h4" strokeLinecap="round" />
    </svg>
  ),
  prescriptions: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
      <path d="M9 8h1M14 8h1M9 12h6M9 16h4" strokeLinecap="round" />
    </svg>
  ),
  medicalHistory: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  ),
  employees: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path
        d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
        strokeLinecap="round"
      />
    </svg>
  ),
  nominas: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  billing: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M12 12v4M10 14h4" strokeLinecap="round" />
    </svg>
  ),
  insurances: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  settings: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  consultingRooms: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  specialities: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  doctorSchedules: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" strokeLinecap="round" />
    </svg>
  ),
  chevronDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline
        points="6 9 12 15 18 9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  chevronUp: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline
        points="18 15 12 9 6 15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

interface NavItem {
  id: string;
  label: string;
  icon: () => JSX.Element;
  route: string;
}

interface NavGroup {
  id: string;
  label: string;
  icon: () => JSX.Element;
  items: NavItem[];
}

const topItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Icons.dashboard,
    route: "dashboard",
  },
  {
    id: "my-appointments",
    label: "My Appointments",
    icon: Icons.appointments,
    route: "my-appointments",
  },
];

const groups: NavGroup[] = [
  {
    id: "users-roles",
    label: "Users & Roles",
    icon: Icons.users,
    items: [
      {
        id: "users",
        label: "Users",
        icon: Icons.patients,
        route: "dashboard/users",
      },
      {
        id: "roles",
        label: "Roles",
        icon: Icons.roles,
        route: "dashboard/roles",
      },
    ],
  },
  {
    id: "clinical",
    label: "Clinical",
    icon: Icons.doctors,
    items: [
      {
        id: "patients",
        label: "Patients",
        icon: Icons.patients,
        route: "dashboard/patients",
      },
      {
        id: "doctors",
        label: "Doctors",
        icon: Icons.doctors,
        route: "dashboard/doctors",
      },
      {
        id: "appointments",
        label: "Appointments",
        icon: Icons.appointments,
        route: "dashboard/appointments",
      },
      {
        id: "diagnostics",
        label: "Diagnostics",
        icon: Icons.diagnostics,
        route: "dashboard/diagnostic",
      },
      {
        id: "prescriptions",
        label: "Prescriptions",
        icon: Icons.prescriptions,
        route: "dashboard/prescriptions",
      },
      {
        id: "medical-histories",
        label: "Medical Histories",
        icon: Icons.medicalHistory,
        route: "dashboard/medical-histories",
      },
    ],
  },
  {
    id: "administration",
    label: "Administration",
    icon: Icons.employees,
    items: [
      {
        id: "employees",
        label: "Employees",
        icon: Icons.employees,
        route: "dashboard/employees",
      },
      {
        id: "nominas",
        label: "Nominas",
        icon: Icons.nominas,
        route: "dashboard/nominas",
      },
      {
        id: "billing",
        label: "Billing",
        icon: Icons.billing,
        route: "dashboard/billing",
      },
      {
        id: "insurances",
        label: "Insurances",
        icon: Icons.insurances,
        route: "dashboard/insurances",
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Icons.settings,
    items: [
      {
        id: "consulting-rooms",
        label: "Consulting Rooms",
        icon: Icons.consultingRooms,
        route: "dashboard/consulting-rooms",
      },
      {
        id: "specialities",
        label: "Specialities",
        icon: Icons.specialities,
        route: "dashboard/specialities",
      },
      {
        id: "doctor-schedules",
        label: "Doctor Schedules",
        icon: Icons.doctorSchedules,
        route: "dashboard/doctor-schedules",
      },
    ],
  },
];

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    new Set(groups.map((g) => g.id)),
  );

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      next.has(groupId) ? next.delete(groupId) : next.add(groupId);
      return next;
    });
  };

  return (
    <aside className={styles.sidebar}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logoWrapper}>
          <span className={styles.logoIcon}>
            <Icons.logo />
          </span>
        </div>
        <div className={styles.brandInfo}>
          <span className={styles.brandName}>ClinicManagement</span>
          <span className={styles.brandSub}>Healthcare System</span>
        </div>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        {/* Top standalone items */}
        {topItems.map((item) => (
          <NavLink to={item.route}>
            <button
              key={item.id}
              className={`${styles.navItem} ${activeItem === item.id ? styles.active : ""}`}
              onClick={() => setActiveItem(item.id)}
            >
              <span className={styles.navIcon}>
                <item.icon />
              </span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          </NavLink>
        ))}

        {/* Groups */}
        {groups.map((group) => (
          <div key={group.id} className={styles.group}>
            <button
              className={styles.groupHeader}
              onClick={() => toggleGroup(group.id)}
            >
              <span className={styles.groupIcon}>
                <group.icon />
              </span>
              <span className={styles.groupLabel}>{group.label}</span>
              <span className={styles.chevron}>
                {openGroups.has(group.id) ? (
                  <Icons.chevronUp />
                ) : (
                  <Icons.chevronDown />
                )}
              </span>
            </button>

            <div
              className={`${styles.groupItems} ${openGroups.has(group.id) ? styles.open : ""}`}
            >
              <div>
                {group.items.map((item) => (
                  <NavLink to={item.route}>
                    <button
                      key={item.id}
                      className={`${styles.navItem} ${styles.nested} ${activeItem === item.id ? styles.active : ""}`}
                      onClick={() => setActiveItem(item.id)}
                    >
                      <span className={styles.navIcon}>
                        <item.icon />
                      </span>
                      <span className={styles.navLabel}>{item.label}</span>
                    </button>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
