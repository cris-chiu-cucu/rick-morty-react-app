import spinnerImage from "../../assets/spinner.svg";

import styles from "./Loader.module.css";

export function Loader() {
  return (
    <div className={styles["loading-overlay"]}>
      <img src={spinnerImage} alt="loading spinner" width="100" height="100" />
    </div>
  );
}
