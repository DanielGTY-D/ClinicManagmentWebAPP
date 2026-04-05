import styles from "./Button.module.css";
import { NavLink } from "react-router";

interface ButtonProps {
  route: string;
  styleType: "simple" | "simple-blue" | "gradient";
  textContent: string;
  hasScrollAnimation?: boolean;
}

export default function Button({
  route,
  styleType,
  textContent,
  hasScrollAnimation,
}: ButtonProps) {
  return (
    <NavLink
      to={route}
      className={`${styles.btn} 
      ${styles[styleType]} 
      ${styleType !== "gradient" ? (hasScrollAnimation ? styles.animationScroll : "") : ""}`}
    >
      {textContent}
    </NavLink>
  );
}
