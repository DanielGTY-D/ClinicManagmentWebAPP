import { NavLink } from "react-router";
import styles from "./CustomButton.module.css";

type Icons = "add" | "";
type Background = "blue" | "white";

export interface CustomButtonProps {
  icon: Icons;
  bg: Background;
  textContent: string;
  isLink?: boolean;
  route?: string;
}

export default function CustomButton({
  icon,
  bg,
  textContent,
  isLink,
  route,
}: CustomButtonProps) {
  const icons = {
    add: (
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
        className="lucide lucide-plus mr-2 h-4 w-4"
        aria-hidden="true"
      >
        <path d="M5 12h14"></path>
        <path d="M12 5v14"></path>
      </svg>
    ),
  };

  return isLink ? (
    <NavLink to={route ?? ""}
      className={`
        ${styles.container} 
        ${bg === "blue" && styles.blue} 
        ${bg === "white" && styles.white}`}
    >
      {icon && <i className={styles.icon}>{icons[icon]}</i>}
      <span className={styles.text}>{textContent}</span>
    </NavLink>
  ) : (
    <button
      className={`
        ${styles.container} 
        ${bg === "blue" && styles.blue} 
        ${bg === "white" && styles.white}`}
    >
      {icon && <i className={styles.icon}>{icons[icon]}</i>}
      <span className={styles.text}>{textContent}</span>
    </button>
  );
}
