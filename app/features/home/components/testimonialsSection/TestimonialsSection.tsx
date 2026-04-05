import Icons from "~/shared/icons/Icons";
import HeaderSection from "../headerSection/HeaderSection";
import styles from "./TestimonialsSection.module.css";
import { useEffect, useRef, useState } from "react";

export default function TestimonialsSection() {
  const [cardWidth, setCardWidth] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const Testimonials = [
    {
      stars: [1, 2, 3, 4, 5],
      testimoni:
        "Como médico, MedAgenda me ha permitido organizar mejor mi agenda y dedicar más tiempo a cada paciente. La plataforma es intuitiva y mis pacientes la adoran.",
      by: "Sofia Morales",
    },
    {
      stars: [1, 2, 3],
      testimoni:
        "Como médico, MedAgenda me ha permitido organizar mejor mi agenda y dedicar más tiempo a cada paciente. La plataforma es intuitiva y mis pacientes la adoran.",
      by: "Sofia Morales",
    },
    {
      stars: [1, 2, 3, 4, 5],
      testimoni:
        "Como médico, MedAgenda me ha permitido organizar mejor mi agenda y dedicar más tiempo a cada paciente. La plataforma es intuitiva y mis pacientes la adoran.",
      by: "Sofia Morales",
    },
    {
      stars: [1, 2, 3, 4],
      testimoni:
        "Como médico, MedAgenda me ha permitido organizar mejor mi agenda y dedicar más tiempo a cada paciente. La plataforma es intuitiva y mis pacientes la adoran.",
      by: "Sofia Morales",
    },
    {
      stars: [1, 2, 3, 4],
      testimoni:
        "Como médico, MedAgenda me ha permitido organizar mejor mi agenda y dedicar más tiempo a cada paciente. La plataforma es intuitiva y mis pacientes la adoran.",
      by: "Sofia Morales",
    },
    {
      stars: [1, 2, 3, 4],
      testimoni:
        "Como médico, MedAgenda me ha permitido organizar mejor mi agenda y dedicar más tiempo a cada paciente. La plataforma es intuitiva y mis pacientes la adoran.",
      by: "Sofia Morales",
    },
  ];


  return (
    <section className={styles.testimonials}>
      <HeaderSection
        title="Testimonios"
        desc=""
        icon=<Icons.HealthIcon />
        opt="Lo que dicen nuestros usuarios"
      />

      <div ref={containerRef} className={styles.testimonialsContent}>
        {Testimonials.map((testimonial, i) => (
          <div
            className={styles.card}
            key={i}
            id={(i + 1).toString()}
            style={{
              transform: `translate(calc(-${cardWidth}px - ${cardWidth !== 0 ? "1rem" : ""}))`,
            }}
          >
            {
              <>
                <div className={styles.cardIconList}>
                  {testimonial.stars.map((star, i) => (
                    <i className={styles.cardIcon} key={i}>
                      <Icons.StarIcon />
                    </i>
                  ))}
                </div>

                <p className={styles.cardText}>{testimonial.testimoni}</p>

                <p className={styles.cardBy}>{testimonial.by}</p>
              </>
            }
          </div>
        ))}
      </div>
    </section>
  );
}
