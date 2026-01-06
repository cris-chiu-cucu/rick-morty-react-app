import styles from "./ErrorPanel.module.css";

export function ErrorPanel({
  error,
  resetErrorBoundary,
  leftAlign,
}: {
  error: Error;
  resetErrorBoundary?: (...args: [unknown]) => void;
  leftAlign?: boolean;
}) {
  return (
    <div
      className={
        leftAlign
          ? `${styles["error-panel"]} ${styles["left-align"]}`
          : `${styles["error-panel"]}`
      }
    >
      {error.message}
      {resetErrorBoundary && (
        <button
          className={styles["error-panel-button"]}
          onClick={resetErrorBoundary}
        >
          Try again
        </button>
      )}
    </div>
  );
}
