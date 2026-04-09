import styles from "./Button.module.css";
import { NavLink } from "react-router";

interface ButtonProps {
  route: string;
  styleType: "simple" | "simple-blue" | "gradient";
  textContent: string;
  hasScrollAnimation?: boolean;
  type: "link" | "submit";
  customFn?: () => void;
}

export default function Button({
  route,
  styleType,
  textContent,
  hasScrollAnimation,
  type,
  customFn
}: ButtonProps) {
  return type === "submit" ? (
    <button
      className={`${styles.btn} 
      ${styles[styleType]} 
      ${styleType !== "gradient" ? (hasScrollAnimation ? styles.animationScroll : "") : ""}`}
      type="submit"
      onClick={customFn}
    >
      {textContent}
    </button>
  ) : (
    <NavLink
      to={route}
      className={`${styles.btn} 
      ${styles[styleType]} 
      ${styleType !== "gradient" ? (hasScrollAnimation ? styles.animationScroll : "") : ""}`}
      onClick={customFn}
    >
      {textContent}
    </NavLink>
  );
}
