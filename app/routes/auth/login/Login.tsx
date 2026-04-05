import type { Route } from "./+types/Login";
import styles from "./Login.module.css";
import Hero from "~/features/auth/components/hero/Hero";
import LoginForm from "~/features/auth/login/components/LoginForm/LoginForm";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Clinic Managment - login" },
    { name: "description", content: "Clinic Management Dashboard" },
  ];
}

export default function Login() {
  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <Hero />
        <LoginForm />
      </div>
    </div>
  )
}
