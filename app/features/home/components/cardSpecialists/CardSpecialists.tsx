import Button from "../button/Button";
import styles from "./CardSpecialists.module.css";

type backgroundBadge = "green" | "blue" | "yellow" | "purple" | "pink";

export interface CardSpecialistsProps {
  img: string;
  badge: string;
  bgBadge: backgroundBadge;
  name: string;
  speciality: string;
  experience: string;
}

export default function CardSpecialists({
  badge,
  bgBadge,
  img,
  experience,
  name,
  speciality,
}: CardSpecialistsProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <span className={`${styles.badge} ${styles[bgBadge]}`}>{badge}</span>
        <img className={styles.cardImage} src={img} alt="imagen del doctor" />
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.speciality}>{speciality}</p>
        <p className={styles.experience}>{experience}</p>
        <Button
          styleType="gradient"
          route="/"
          textContent="Agendar cita"
          hasScrollAnimation={false}
        />
      </div>
    </div>
  );
}
