import styles from "./Footer.module.css";
import Icons from "~/shared/icons/Icons";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTittle}>
            <span className={styles.footerLogo}>
              <Icons.LogoIconTwo />
            </span>
            Med<span>Agenda</span>
          </h3>

          <p className={styles.footerDescription}>
            La plataforma lider de gestion de citas medicas en latinoamericas.
          </p>

          <ul className={styles.footerSocialMedia}>
            <li className={styles.footerSocialMediaItem}>
              <a href="#">
                <Icons.FacebookIcon />
              </a>
            </li>
            <li className={styles.footerSocialMediaItem}>
              <a href="#">
                <Icons.TwitterIcon />
              </a>
            </li>
            <li className={styles.footerSocialMediaItem}>
              <a href="#">
                <Icons.IntagramIcon />
              </a>
            </li>
            <li className={styles.footerSocialMediaItem}>
              <a href="#">
                <Icons.LinkedInIcon />
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <div className={styles.footerLinks}>
            <h4 className={styles.footerLinksTittle}>Plataforma</h4>

            <ul className={styles.footerLinksList}>
              <li className={styles.footerLinksListItem}>
                <a href="">Como funciona</a>
              </li>
              <li className={styles.footerLinksListItem}>
                <a href="">Precios</a>
              </li>
              <li className={styles.footerLinksListItem}>
                <a href="">Seguridad</a>
              </li>
              <li className={styles.footerLinksListItem}>
                <a href="">API para clinica</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerLinks}>
            <h4 className={styles.footerLinksTittle}>Servicios</h4>

            <ul className={styles.footerLinksList}>
              <li className={styles.footerLinksListItem}>
                <a href="">Consultora General</a>
              </li>
              <li className={styles.footerLinksListItem}>
                <a href="">Especialidades</a>
              </li>
              <li className={styles.footerLinksListItem}>
                <a href="">Telemedicina</a>
              </li>
              <li className={styles.footerLinksListItem}>
                <a href="">Laboratorio</a>
              </li>
              <li className={styles.footerLinksListItem}>
                <a href="">Urgencias</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerLinks}>
            <h4 className={styles.footerLinksTittle}>Empresa</h4>

            <ul className={styles.footerLinksList}>
              <li className={styles.footerLinksListItem}>
                <a href="">Sobre nosotros</a>
              </li>
              <li className={styles.footerLinksListItem}>
                <a href="">Blog</a>
              </li>
              <li className={styles.footerLinksListItem}>
                <a href="">prensa</a>
              </li>
              <li className={styles.footerLinksListItem}>
                <a href="">Trabaja con nosotros</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerLinks}>
            <h4 className={styles.footerLinksTittle}>Legal</h4>

            <ul className={styles.footerLinksList}>
              <li className={styles.footerLinksListItem}>
                <a href="">Privacidad</a>
              </li>
              <li className={styles.footerLinksListItem}>
                <a href="">Terminos de uso</a>
              </li>
              <li className={styles.footerLinksListItem}>
                <a href="">Cookies</a>
              </li>
              <li className={styles.footerLinksListItem}>
                <a href="">HIPPAA Compilance</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
