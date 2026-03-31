import CustomButton, {
  type CustomButtonProps,
} from "../customButton/CustomButton";
import styles from "./RouteHeader.module.css";

interface RouteHeaderProps {
  routeHeader: string;
  routeSubHeader: string;
  customButtonProps?: CustomButtonProps;
}

export default function RouteHeader({
  routeHeader,
  routeSubHeader,
  customButtonProps,
}: RouteHeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.col}>
        <h1 className={styles.header}>{routeHeader}</h1>
        <p className={styles.subHeader}>{routeSubHeader}</p>
      </div>

      {customButtonProps && <CustomButton {...customButtonProps} />}
    </div>
  );
}
