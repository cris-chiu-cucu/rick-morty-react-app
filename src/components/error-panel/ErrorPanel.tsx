import type { FallbackProps } from "react-error-boundary";

import styles from "./ErrorPanel.module.css";

export default function ErrorPanel({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className={styles["error-panel"]}>
      {error.message}
      <button
        className={styles["error-panel-button"]}
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </div>
  );
}
