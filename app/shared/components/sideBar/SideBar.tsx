import React, { useEffect, useState, type JSX } from "react";
import styles from "./SideBar.module.css";
import { NavLink, useNavigate } from "react-router";
import Icons from "~/shared/icons/Icons";
import { JWTDecode, type CustomPayload } from "~/shared/utils/jwtDecode";


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
    icon: Icons.DashboardIcon,
    route: "dashboard",
  },
  {
    id: "my-appointments",
    label: "My Appointments",
    icon: Icons.AppointmentsIcon,
    route: "my-appointments",
  },
];

const groups: NavGroup[] = [
  {
    id: "users-roles",
    label: "Users & Roles",
    icon: Icons.UsersIcon,
    items: [
      {
        id: "users",
        label: "Users",
        icon: Icons.PatientsIcon,
        route: "dashboard/users",
      },
      {
        id: "roles",
        label: "Roles",
        icon: Icons.RolesIcon,
        route: "dashboard/roles",
      },
    ],
  },
  {
    id: "clinical",
    label: "Clinical",
    icon: Icons.DoctorsIcon,
    items: [
      {
        id: "patients",
        label: "Patients",
        icon: Icons.PatientsIcon,
        route: "dashboard/patients",
      },
      {
        id: "doctors",
        label: "Doctors",
        icon: Icons.DoctorsIcon,
        route: "dashboard/doctors",
      },
      {
        id: "appointments",
        label: "Appointments",
        icon: Icons.AppointmentsIcon,
        route: "dashboard/appointments",
      },
      {
        id: "diagnostics",
        label: "Diagnostics",
        icon: Icons.DiagnosticsIcon,
        route: "dashboard/diagnostic",
      },
      {
        id: "prescriptions",
        label: "Prescriptions",
        icon: Icons.PrescriptionsIcon,
        route: "dashboard/prescriptions",
      },
      {
        id: "medical-histories",
        label: "Medical Histories",
        icon: Icons.MedicalHistoryIcon,
        route: "dashboard/medical-histories",
      },
    ],
  },
  {
    id: "administration",
    label: "Administration",
    icon: Icons.EmployeesIcon,
    items: [
      {
        id: "employees",
        label: "Employees",
        icon: Icons.EmployeesIcon,
        route: "dashboard/employees",
      },
      {
        id: "nominas",
        label: "Nominas",
        icon: Icons.NominasIcon,
        route: "dashboard/nominas",
      },
      {
        id: "billing",
        label: "Billing",
        icon: Icons.BillingIcon,
        route: "dashboard/billing",
      },
      {
        id: "insurances",
        label: "Insurances",
        icon: Icons.InsurancesIcon,
        route: "dashboard/insurances",
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Icons.SettingsIcon,
    items: [
      {
        id: "consulting-rooms",
        label: "Consulting Rooms",
        icon: Icons.ConsultingRoomsIcon,
        route: "dashboard/consulting-rooms",
      },
      {
        id: "specialities",
        label: "Specialities",
        icon: Icons.SpecialitiesIcon,
        route: "dashboard/specialities",
      },
      {
        id: "doctor-schedules",
        label: "Doctor Schedules",
        icon: Icons.DoctorSchedulesIcon,
        route: "dashboard/doctor-schedules",
      },
    ],
  },
];

const Sidebar: React.FC = () => {
  const [tokenPayload, setTokenPayload] = useState<CustomPayload | null>(null);
  const navigate = useNavigate();
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

  useEffect(() => {
      const tokenData = JWTDecode();
  
      if (!tokenData) {
        navigate("/")
      }
  
      setTokenPayload(tokenData);
    }, []);

  return (
    <aside className={styles.sidebar}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logoWrapper}>
          <span className={styles.logoIcon}>
            <Icons.logoIcon />
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
          <NavLink to={item.route} key={item.id} className={({isActive}) => isActive ? styles.active : ""}>
            <button
              key={item.id}
              className={`${styles.navItem}`}
            >
              <span className={styles.navIcon}>
                <item.icon />
              </span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          </NavLink>
        ))}

        {/* Groups */}
        {tokenPayload?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] !== "patient" && groups.map((group) => (
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
                  <Icons.ChevronUpIcon />
                ) : (
                  <Icons.ChevronDownIcon />
                )}
              </span>
            </button>

            <div
              className={`${styles.groupItems} ${openGroups.has(group.id) ? styles.open : ""}`}
            >
              <div>
                {group.items.map((item) => (
                  <NavLink to={item.route} key={item.id} className={({isActive}) => isActive ? styles.active : ""}>
                    <button
                      key={item.id}
                      className={`${styles.navItem} ${styles.nested}`}
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
