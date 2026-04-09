import RouteHeader from "~/shared/components/routeHeader/RouteHeader";
import styles from "./UserDashboardPanel.module.css";
import Icons from "~/shared/icons/Icons";
import CustomButton from "~/shared/components/customButton/CustomButton";

export default function UserDashboardPanel() {

    new Date().getDate()

  const AppointmentsMock = [
    {
      date: new Date().toLocaleDateString("es", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }),
      status: "pendiente",
      patient: "Dra. Claudia ramirez",
      doctor: "Jorge quintero",
      speciality: "cardiologia",
      consultingRoom: "2",
      billing: {
        amount: "1200",
        paytmentMethod: "efectivo",
        invoiceNumber: "234234234234",
      },
      diagnostic: {},
    },
    {
      date: Date.now(),
      status: "pendiente",
      patient: "Dra. Claudia ramirez",
      doctor: "Jorge quintero",
      speciality: "cardiologia",
      consultingRoom: "2",
      billing: {
        amount: "1200",
        paytmentMethod: "efectivo",
        invoiceNumber: "234234234234",
      },
      diagnostic: {},
    },
    {
      date: Date.now(),
      status: "pendiente",
      patient: "Dra. Claudia ramirez",
      doctor: "Jorge quintero",
      speciality: "cardiologia",
      consultingRoom: "2",
      billing: {
        amount: "1200",
        paytmentMethod: "efectivo",
        invoiceNumber: "234234234234",
      },
      diagnostic: {},
    },
    {
      date: Date.now(),
      status: "pendiente",
      patient: "Claudia ramirez",
      doctor: "Dra. Jorge quintero",
      speciality: "cardiologia",
      consultingRoom: "2",
      billing: {
        amount: "1200",
        paytmentMethod: "efectivo",
        invoiceNumber: "234234234234",
      },
      diagnostic: {},
    },
  ];

  return (
    <div className={styles.container}>
      <RouteHeader
        routeHeader="My Appointments"
        routeSubHeader="Gestiona tus citas medicas programadas"
        customButtonProps={{
          bg: "blue",
          icon: "AddIcon",
          textContent: "Nueva cita",
          isLink: true,
          route: "my-appointments",
        }}
      />

      <div className={styles.options}>
        <div className={styles.leftOptions}>
          <ul className={styles.optionsList}>
            <li className={styles.optionItem}>
              <p>Todas</p>
            </li>
            <li className={styles.optionItem}>
              <p>Pendientes</p>
            </li>
            <li className={styles.optionItem}>
              <p>Activas</p>
            </li>
            <li className={styles.optionItem}>
              <p>Completadas</p>
            </li>
            <li className={styles.optionItem}>
              <p>Canceladas</p>
            </li>
          </ul>
        </div>

        <div className={styles.rightOptions}>
          <ul className={styles.optionsList}>
            <li className={styles.optionItem}>
              <p>Lista</p>
            </li>
            <li className={styles.optionItem}>
              <p>Cuadricula</p>
            </li>
          </ul>
        </div>
      </div>

      <section className={styles.content}>
        <ul className={styles.contentList}>
          {AppointmentsMock.map((appointment) => (
            <li className={styles.appointment}>
              <i className={styles.appointmentIcon}>
                <Icons.CalendarIcon />
              </i>

              <div className={styles.appointmentContent}>
                <h3 className={styles.appointmentTittle}>
                  {appointment.doctor} <span>{appointment.status}</span>
                </h3>

                <div className={styles.appointmentInfo}>
                  <p>{appointment.speciality}</p>
                  <p>
                    <i>
                      <Icons.locationIcon />
                    </i>
                    Sala: {appointment.consultingRoom}
                  </p>
                  <p>
                    <i>
                      <Icons.ClockIcon />
                    </i>
                    {appointment.date}
                  </p>
                </div>
              </div>

              <div className={styles.actions}>
                <CustomButton 
                    bg="white"
                    icon=""
                    textContent="Reprogramar"
                    isLink={true}
                    route="dashboard/appointmet/edit"
                />
                <CustomButton 
                    bg="white"
                    icon=""
                    textContent="Reprogramar"
                    isLink={true}
                    route="dashboard/appointmet/edit"
                />
                <CustomButton 
                    bg="white"
                    icon=""
                    textContent="Reprogramar"
                    isLink={true}
                    route="dashboard/appointmet/edit"
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
