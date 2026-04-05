import Icons from "~/shared/icons/Icons";
import styles from "./Hero.module.css";
import Button from "../button/Button";

export default function Hero() {
  
  const HERO_IMG =
    "https://images.unsplash.com/photo-1758691463203-cce9d415b2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neSUyMGRpZ2l0YWwlMjBoZWFsdGglMjBpbm5vdmF0aW9ufGVufDF8fHx8MTc3NTA2MjIzN3ww&ixlib=rb-4.1.0&q=80&w=800";

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.heroCircle}></div>
        <div className={styles.heroContent}>
          <span className={styles.heroBrand}>
            <i>
              <Icons.LogoIconTwo />
            </i>
            <p>Pataforma #1 de citas medicas</p>
          </span>

          <h2 className={styles.heroTittle}>
            Getsiona tus <span>Citas medicas</span> en un solo lugar
          </h2>

          <p className={styles.heroDescription}>
            Conectamos pacientes con los mejores specialistas medicos. Agenda
            citas, realiza vidoconsultas y gestiona tu hsitorial clinico desde
            cualquier dispositivo, las 24 horas del dia.
          </p>

          <div className={styles.heroActions}>
            <Button route="/" styleType="gradient" textContent="Registrarse gratis" />
            <Button
              route="/"
              styleType="simple"
              textContent="Ver Demo"
              hasScrollAnimation={true}
            />
          </div>

          <div className={styles.heroStatistics}>
            <div className={styles.statisticItem}>
              <p>50K+</p>
              <span>Pacientes activos</span>
            </div>
            <div className={styles.statisticItem}>
              <p>1,2000+</p>
              <span>Especialistas</span>
            </div>
            <div className={styles.statisticItem}>
              <p>4.9</p>
              <span>Valoracion media</span>
            </div>
          </div>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.heroImageBackground}></div>
          <img src={HERO_IMG} alt="hero" />
        </div>
      </div>
      <div className={styles.heroCircle}></div>
      <i>
        <Icons.HeroBorder />
      </i>
    </section>
  );
}
