import styles from "./InputSearch.module.css";

export default function InputSearch() {
  return (
    <div className={styles.container}>
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
        className="lucide lucide-search"
        aria-hidden="true"
      >
        <path d="m21 21-4.34-4.34"></path>
        <circle cx="11" cy="11" r="8"></circle>
      </svg>
      <input className={styles.input} id="search" name="search" type="search" placeholder="Search..." />
    </div>
  );
}
