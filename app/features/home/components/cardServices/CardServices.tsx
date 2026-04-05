import type { JSX } from "react";
import styles from "./CardServices.module.css";
import { NavLink } from "react-router";

type colors = "purple" | "blue" | "green" | "yellow" | "red" | "pink";

export interface CardServicesProps {
  icon: React.ReactNode;
  title: string;
  data: string;
  route: string
  color?: colors;
}

export default function CardServices({ data, icon, title, route, color }: CardServicesProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardContainer}>
        <i className={`${styles.cardIcon} ${color && styles[`bg-${color}`]}`}>{icon}</i>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardData}>{data}</p>
      </div>

      <NavLink to={route} className={`${styles.cardLink} ${color && styles[color]}`} >Ver mas...</NavLink>
    </div>
  );
}
