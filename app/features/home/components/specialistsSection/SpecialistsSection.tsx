import Icons from "~/shared/icons/Icons";
import styles from "./SpecialistsSection.module.css";
import HeaderSection from "../headerSection/HeaderSection";
import CardSpecialists, { type CardSpecialistsProps } from "../cardSpecialists/CardSpecialists";
import { uuidv7 } from "zod";
import generateUUID from "~/shared/utils/generateUUID";

export default function SpecialitiesSection() {
  const Images = [
    "https://images.unsplash.com/photo-1713865467253-ce0ac8477d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBzbWlsaW5nJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc1MDQ3MTc2fDA&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1645066928295-2506defde470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwbWVkaWNhbCUyMHdoaXRlJTIwY29hdHxlbnwxfHx8fDE3NzUwNjIyMzV8MA&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1673865641073-4479f93a7776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBjYXJkaW9sb2dpc3QlMjBzcGVjaWFsaXN0JTIwZG9jdG9yfGVufDF8fHx8MTc3NTA2MjIzNXww&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1758691462164-100b5e356169?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcGVkaWF0cmljaWFuJTIwZG9jdG9yJTIwY2hpbGRyZW4lMjBob3NwaXRhbHxlbnwxfHx8fDE3NzUwNjIyMzZ8MA&ixlib=rb-4.1.0&q=80&w=400",
    "https://images.unsplash.com/photo-1713865469952-ab0c56bbddd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcGF0aWVudCUyMGhhcHB5JTIwb25saW5lJTIwYXBwb2ludG1lbnR8ZW58MXx8fHwxNzc1MDYyMjQxfDA&ixlib=rb-4.1.0&q=80&w=800"
  ]

  const Doctors: CardSpecialistsProps[] = [
    {
        badge: "Disponible hoy",
        bgBadge: "green",
        experience: "15 years of experience",
        name: "Dra. Ana Garcia",
        img: Images[0],
        speciality: "Cardiologa"
    },
    {
        badge: "Popular",
        bgBadge: "blue",
        experience: "12 years of experience",
        name: "Dr. Carlos Mendez",
        img: Images[1],
        speciality: "Neurologo"
    },
    {
        badge: "Top Valorada",
        bgBadge: "yellow",
        experience: "10 years of experience",
        name: "Dra. Laura Torres",
        img: Images[2],
        speciality: "Cardiologa"
    },
    {
        badge: "Disponible hoy",
        bgBadge: "green",
        experience: "18 years of experience",
        name: "Dr. Miguel Ruiz",
        img: Images[3],
        speciality: "Medico General y Pediatra"
    },
  ]

  return (
    <section className={styles.specialities}>
      <div className={styles.specialitiesContainer}>
        <HeaderSection
          title="Conoce a nuestros especialistas"
          icon=<Icons.UsersIcon />
          opt="Conoce a nuestros medicos"
          desc="Tdos nuestro especialistan estan certificados y tienen amplia experiencias en sus areas"
        />
        <div className={styles.specialitiesContent}>
          {
            Doctors.map( dr => (
              <CardSpecialists 
                {...dr}
                key={generateUUID()}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
}
