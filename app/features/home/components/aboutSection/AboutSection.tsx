import Icons from "~/shared/icons/Icons";
import HeaderSection from "../headerSection/HeaderSection";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section className={styles.about}>
      <div className={styles.aboutContainer}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src="https://images.unsplash.com/photo-1713865469952-ab0c56bbddd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcGF0aWVudCUyMGhhcHB5JTIwb25saW5lJTIwYXBwb2ludG1lbnR8ZW58MXx8fHwxNzc1MDYyMjQxfDA&ixlib=rb-4.1.0&q=80&w=800"
            alt="about us image"
          />

          <div className={styles.tag}>
            <div className={styles.tagImagesContainer}>
              <img
                className={styles.tagImage}
                src="https://images.unsplash.com/photo-1713865467253-ce0ac8477d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBzbWlsaW5nJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc1MDQ3MTc2fDA&ixlib=rb-4.1.0&q=80&w=400"
                alt="person"
              />
              <img
                className={styles.tagImage}
                src="https://images.unsplash.com/photo-1645066928295-2506defde470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwbWVkaWNhbCUyMHdoaXRlJTIwY29hdHxlbnwxfHx8fDE3NzUwNjIyMzV8MA&ixlib=rb-4.1.0&q=80&w=400"
                alt="person"
              />
              <img
                className={styles.tagImage}
                src="https://images.unsplash.com/photo-1673865641073-4479f93a7776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBjYXJkaW9sb2dpc3QlMjBzcGVjaWFsaXN0JTIwZG9jdG9yfGVufDF8fHx8MTc3NTA2MjIzNXww&ixlib=rb-4.1.0&q=80&w=400"
                alt="person"
              />
            </div>
            <div className={styles.tagContent}>
              <p>Satisfacion de los pacientes</p>

              <div className={styles.tagRate}>
                <div className={styles.tagRateListIcons}>
                    <i className={styles.TagRateIcon}>
                        <Icons.StarIcon />
                    </i>
                    <i className={styles.TagRateIcon}>
                        <Icons.StarIcon />
                    </i>
                    <i className={styles.TagRateIcon}>
                        <Icons.StarIcon />
                    </i>
                    <i className={styles.TagRateIcon}>
                        <Icons.StarIcon />
                    </i>
                    <i className={styles.TagRateIcon}>
                        <Icons.StarIcon />
                    </i>
                </div>

                <p>98%</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.aboutContent}>
          <HeaderSection
            title="Por que elegirnos"
            icon=<Icons.InsurancesIcon />
            opt="Una experiencia medica completamente digital"
            desc="Diseñada para hacer tu vida más fácil, MedAgenda transforma la forma en que cuidas tu salud."
          />

          <ul className={styles.services}>
            <li className={styles.serviceItem}>
              <i className={styles.serviceIcon}>
                <Icons.CalendarIcon />
              </i>
              <div className={styles.serviceContent}>
                <p>Agendamiento 24/7</p>
                <span>
                  Reserva citas en cualquier momento, desde cualquier
                  dispositivo. Sin esperas ni llamadas telefónicas.
                </span>
              </div>
            </li>

            <li className={styles.serviceItem}>
              <i className={styles.serviceIcon}>
                <Icons.SettingsIcon />
              </i>
              <div className={styles.serviceContent}>
                <p>Recordatorios automaticos</p>
                <span>
                  Recibe notificaciones por SMS y email antes de tu cita para que no olvides ningún detalle.
                </span>
              </div>
            </li>

            <li className={styles.serviceItem}>
              <i className={styles.serviceIcon}>
                <Icons.MedicalHistoryIcon />
              </i>
              <div className={styles.serviceContent}>
                <p>Historial Clinico</p>
                <span>
                 Accede a todo tu historial médico, recetas y resultados de exámenes en un solo lugar seguro.
                </span>
              </div>
            </li>

            <li className={styles.serviceItem}>
              <i className={styles.serviceIcon}>
                <Icons.CameraIcons />
              </i>
              <div className={styles.serviceContent}>
                <p>Videoconsultas HD</p>
                <span>
                  Consultas por video de alta calidad con grabación opcional y prescripciones digitales.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
