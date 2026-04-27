import RegisterHero from "~/features/auth/components/hero/Hero";
import styles from "./Assign.module.css";
import { useParams } from "react-router";
import AssignForm from "~/features/assign/components/assignForm/AssignForm";
import Notification from "~/shared/components/notification/Notification";

export default function Assing() {
  return (
    <>
      <Notification />
      <div className={styles.container}>
        <RegisterHero />
        <AssignForm />
      </div>
    </>
  );
}
