import Container from "~/shared/components/container/Container";
import type { Route } from "./+types/Dashboard";
import styles from "./routesCss/Dashboard.module.css";
import RouteHeader from "~/shared/components/routeHeader/RouteHeader";
import type { JSX, ReactNode } from "react";
import CustomButton, { type CustomButtonProps } from "~/shared/components/customButton/CustomButton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clinic Managment - Dashboard" },
    { name: "description", content: "Clinic Management Dashboard" },
  ];
}

interface CardInfo {
  title: string;
  icon: () => JSX.Element;
  data: number;
}

export default function Home() {
  const icons = {
    arrow: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-arrow-right h-3 w-3"
        aria-hidden="true"
      >
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
      </svg>
    ),
  };

  const cards: CardInfo[] = [
    {
      data: 5,
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-users h-4 w-4"
          aria-hidden="true"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <circle cx="9" cy="7" r="4"></circle>
        </svg>
      ),
      title: "Total Patients",
    },
    {
      data: 4,
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-stethoscope h-4 w-4"
          aria-hidden="true"
        >
          <path d="M11 2v2"></path>
          <path d="M5 2v2"></path>
          <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"></path>
          <path d="M8 15a6 6 0 0 0 12 0v-3"></path>
          <circle cx="20" cy="10" r="2"></circle>
        </svg>
      ),
      title: "Active Doctors",
    },
    {
      data: 5,
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-calendar h-4 w-4"
          aria-hidden="true"
        >
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
        </svg>
      ),
      title: "Total Patients",
    },
    {
      data: 5,
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-calendar h-4 w-4"
          aria-hidden="true"
        >
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
        </svg>
      ),
      title: "Total Patients",
    },
  ];

  const buttons: CustomButtonProps[] = [
    {
      bg: "blue",
      icon: "add",
      textContent: "New Appointment",
      isLink: true,
      route: "dashboard/appointments"
    },
    {
      bg: "white",
      icon: "add",
      textContent: "New Patient",
      isLink: true,
      route: "dashboard/patients"
    },
    {
      bg: "white",
      icon: "add",
      textContent: "New billing",
      isLink: true,
      route: "dashboard/billing"
    }
  ]

  return (
    <>
      <RouteHeader
        routeSubHeader="Dashboard"
        routeHeader="Bienvenido al dashboard"
      />

      <div className={styles.cardList}>
        {cards.map((card) => (
          <Container>
            <div className={styles.cardContainer}>
              <div className={styles.cardHeader}>
                <p className={styles.cardTitle}>{card.title}</p>
                <i className={styles.cardIcon}>
                  <card.icon />
                </i>
              </div>

              <div className={styles.cardData}>{card.data}</div>

              <button className={styles.cardButton}>
                view all...
                <i className={styles.cardIconButton}>
                  <icons.arrow />
                </i>
              </button>
            </div>
          </Container>
        ))}
      </div>

      <div className={styles.actions}>
        {
          buttons.map( btn => (
            <CustomButton {...btn}/>
          ))
        }
      </div>

      <div className={styles.table}>
        <Container>
          <RouteHeader 
            routeHeader="Recent Appointments"
            routeSubHeader="Ultmos horarios de citas en el sistema"
            customButtonProps={{
              bg: "white",
              icon: "",
              textContent: "View All",
              isLink: true,
              route: "dashboard/my-appointments"
            }}
          />

          <table className={styles.tableContent}>
            <thead className={styles.tableHeader}>
              <tr className={styles.tableHeaderRow}>
                <th className={styles.tableHeaderCol }>Date</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Speciality</th>
                <th>Room</th>
                <th>Status</th>
              </tr>
            </thead>
          </table>
        </Container>
      </div>
    </>
  );
}
