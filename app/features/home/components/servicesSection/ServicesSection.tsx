import Icons from "~/shared/icons/Icons";
import styles from "./ServicesSection.module.css";
import type { CardServicesProps } from "../cardServices/CardServices";
import CardServices from "../cardServices/CardServices";
import HeaderSection from "../headerSection/HeaderSection";
import generateUUID from "~/shared/utils/generateUUID";

export default function Services() {
  const services: CardServicesProps[] = [
    {
      icon: <Icons.StethoscopeIcon />,
      title: "Consulta general",
      data: "Atencion primaria con medicos generales certificados para diagnosticos y seguimiento.",
      route: "/",
      color: "blue",
    },
    {
      icon: <Icons.BrainIcon />,
      title: "Especialidades medicas",
      data: "Mas de 50 especialidades disponibles: Cardiologia, dermatologia, pediatria y mas con especialistas certificados.",
      route: "/",
      color: "purple",
    },
    {
      icon: <Icons.CameraIcons />,
      title: "Telemedicina",
      data: "Videoconsultads desde a comodidad de tu hogar, con la misma calidad que en persona",
      route: "/",
      color: "green",
    },
    {
      icon: <Icons.QuimicIcon />,
      title: "Examenes de lab.",
      data: "Solicita y reciba resultados de laboratorio digitalmente con seguimiento en tiempo real",
      route: "/",
      color: "yellow",
    },
    {
      icon: <Icons.EmergencyIcon />,
      title: "Urgencias 24/7",
      data: "Accesos inmediato a medicos de urgencias en cualquir momento del dia o la noche",
      route: "/",
      color: "red",
    },
    {
      icon: <Icons.HealthIcon />,
      title: "Psicologia",
      data: "Apoyo en la salud mental con psicologos y terapeutas especializados en diversas areas",
      route: "/",
      color: "pink",
    },
  ];

  return (
    <section className={styles.services}>
      <div className={styles.servicesContainer}>
        <HeaderSection
          title="Nuestro servicios"
          icon=<Icons.StethoscopeIcon />
          opt="Todo lo que necesitas para tu salud"
          desc="Ofrecemos una amplia gama de servicios medicos para cubrir todas tus
            necesidades de salud en un solo lugar"
        />

        <div className={styles.servicesContent}>
          {services.map((service) => (
            <CardServices {...service} key={generateUUID()}/>
          ))}
        </div>
      </div>
    </section>
  );
}
