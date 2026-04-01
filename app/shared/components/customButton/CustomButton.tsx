import styles from "./CustomButton.module.css";
import Icons from "~/shared/icons/Icons";
import { NavLink } from "react-router";

type Icons = "AddIcon" | "";
type Background = "blue" | "white";

export interface CustomButtonProps {
  icon: Icons;
  bg: Background;
  textContent: string;
  isLink?: boolean;
  route?: string;
  onModalOpen?: () => void;
  type: "button" | "reset" | "submit"
}

export default function CustomButton({
  icon,
  bg,
  textContent,
  isLink,
  route,
  onModalOpen,
  type = "button"
}: CustomButtonProps) {
  return isLink ? (
    <NavLink
      to={route ?? ""}
      className={`
        ${styles.container} 
        ${bg === "blue" && styles.blue} 
        ${bg === "white" && styles.white}`}
    >
      {icon && (
        <i className={styles.icon}>{icon === "AddIcon" && <Icons.AddIcon />}</i>
      )}
      <span className={styles.text}>{textContent}</span>
    </NavLink>
  ) : (
    <button
      className={`
        ${styles.container} 
        ${bg === "blue" && styles.blue} 
        ${bg === "white" && styles.white}`}
        onClick={onModalOpen}
        type={type}
    >
      {icon && (
        <i className={styles.icon}>{icon === "AddIcon" && <Icons.AddIcon />}</i>
      )}
      <span className={styles.text}>{textContent}</span>
    </button>
  );
}
