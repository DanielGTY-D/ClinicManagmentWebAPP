import type { Route } from "./+types/Dashboard";
import styles from "./Dashboard.module.css";
import Container from "~/shared/components/container/Container";
import RouteHeader from "~/shared/components/routeHeader/RouteHeader";
import CustomButton, {
  type CustomButtonProps,
} from "~/shared/components/customButton/CustomButton";
import Icons from "~/shared/icons/Icons";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clinic Managment - Dashboard" },
    { name: "description", content: "Clinic Management Dashboard" },
  ];
}

interface CardInfo {
  title: string;
  icon: React.ReactNode;
  data: number;
}



export default function Dashboard() {
  const cards: CardInfo[] = [
    { data: 5, icon: <Icons.UsersIcon />, title: "Total Patients" },
    { data: 4, icon: <Icons.StethoscopeIcon />, title: "Active Doctors" },
    { data: 5, icon: <Icons.CalendarIcon />, title: "Appointments Today" },
    { data: 5, icon: <Icons.CalendarIcon />, title: "Pending Reviews" },
  ];

  const buttons: CustomButtonProps[] = [
    {
      bg: "blue",
      icon: "AddIcon",
      textContent: "New Appointment",
      isLink: true,
      route: "appointments",
    },
    {
      bg: "white",
      icon: "AddIcon",
      textContent: "New Patient",
      isLink: true,
      route: "patients",
      type: "button"
    },
    {
      bg: "white",
      icon: "AddIcon",
      textContent: "New billing",
      isLink: true,
      route: "billing",
    },
  ];

  return (
    <>
      <RouteHeader
        routeSubHeader="Dashboard"
        routeHeader="Bienvenido al dashboard"
      />

      <div className={styles.cardList}>
        {cards.map((card) => (
          <Container key={card.title}>
            <div className={styles.cardContainer}>
              <div className={styles.cardHeader}>
                <p className={styles.cardTitle}>{card.title}</p>
                <i className={styles.cardIcon}>{card.icon}</i>
              </div>

              <div className={styles.cardData}>{card.data}</div>

              <button className={styles.cardButton}>
                view all...
                <i className={styles.cardIconButton}>
                  <Icons.ArrowRightIcon />
                </i>
              </button>
            </div>
          </Container>
        ))}
      </div>

      <div className={styles.actions}>
        {buttons.map((btn) => (
          <CustomButton {...btn} />
        ))}
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
              route: "dashboard/my-appointments",
            }}
          />

          <table className={styles.tableContent}>
            <thead className={styles.tableHeader}>
              <tr className={styles.tableHeaderRow}>
                <th className={styles.tableHeaderCol}>Date</th>
                <th className={styles.tableHeaderCol}>Patient</th>
                <th className={styles.tableHeaderCol}>Doctor</th>
                <th className={styles.tableHeaderCol}>Speciality</th>
                <th className={styles.tableHeaderCol}>Room</th>
                <th className={styles.tableHeaderCol}>Status</th>
              </tr>
            </thead>
          </table>
        </Container>
      </div>
    </>
  );
}
