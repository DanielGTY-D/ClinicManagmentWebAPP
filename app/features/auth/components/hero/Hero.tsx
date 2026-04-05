import styles from "./Hero.module.css";
import Icons from "~/shared/icons/Icons";

export default function RegisterHero() {
  const IMG = "https://images.unsplash.com/photo-1758691463203-cce9d415b2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neSUyMGRpZ2l0YWwlMjBoZWFsdGglMjBpbm5vdmF0aW9ufGVufDF8fHx8MTc3NTA2MjIzN3ww&ixlib=rb-4.1.0&q=80&w=800"
  return (
    <>
      {/* hero */}
      <div className={styles.leftCol}>
        <div className={styles.web}></div>
        <header className={styles.header}>
          <i className={styles.headerIcon}>
            <Icons.LogoIconTwo />
          </i>
          <h1 className={styles.headerTittle}>
            Med<span>Agenda</span>
          </h1>
        </header>

        <div className={styles.imageContainer}>
          <div className={styles.tag}>
            <i className={styles.tagIcon}>
              <Icons.StarIcon />
            </i>
            <div className={styles.tagContent}>
              <p className={styles.tagRate}>4.9 / 5</p>
              <p className={styles.tagComments}>342 Resenas</p>
            </div>
          </div>
          <div className={styles.imageBackground}></div>
          <img className={styles.image} src={IMG} alt="hero image" />
        </div>

        <footer className={styles.footer}>
          <span>Por que unirte?</span>

          <div className={styles.footerInfo}>
            <i className={styles.footerInfoIcon}><Icons.CalendarIcon /></i>
            <p className={styles.footerInfoText}>Agenda citas en segundos, 24/7</p>
          </div>
          <div className={styles.footerInfo}>
            <i className={styles.footerInfoIcon}><Icons.StethoscopeIcon /></i>
            <p className={styles.footerInfoText}>Acceso a 1,2000+ especialistas</p>
          </div>
        </footer>
      </div>
    </>
  )
}
