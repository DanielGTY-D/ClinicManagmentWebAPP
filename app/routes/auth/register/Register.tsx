import type { Route } from "./+types/Register";
import styles from "./Register.module.css";
import RegisterForm from "~/features/auth/register/components/registerForm/RegisterForm";
import Hero from "~/features/auth/components/hero/Hero";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Clinic Managment - Register" },
    { name: "description", content: "Clinic Management Dashboard" },
  ];
}

export default function Register() {


  return (
    <div className={styles.register}>
      <div className={styles.registerContainer}>
        <Hero />
        <RegisterForm />
      </div>
    </div>
  )
}
