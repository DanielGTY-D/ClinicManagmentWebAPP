import styles from "./RouteHeader.module.css";

type RouteHeaderProps = {
  title: string;
  description: string;
  buttonName: string;
};

export default function RouteHeader({
  title,
  description,
  buttonName,
}: RouteHeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.desc}>{description}</p>
      </div>

      <button className={styles.button}>
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
        {buttonName}
      </button>
    </div>
  );
}
