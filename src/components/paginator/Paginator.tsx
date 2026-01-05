import { Link } from "react-router";

import styles from "./Paginator.module.css";

export default function Paginator({
  currentPage,
  pages,
}: {
  currentPage: number;
  pages: number;
}) {
  // 3 is the maximal number of buttons to be displayed in paginator
  const maxNumericPageButtons = pages < 3 ? pages : 3;
  const displayedPageNumbers: number[] = [];

  if (currentPage < maxNumericPageButtons) {
    for (let i = 1; i <= maxNumericPageButtons; i++) {
      displayedPageNumbers.push(i);
    }
  } else if (pages - currentPage < maxNumericPageButtons) {
    let pageNumber = pages;
    for (let i = maxNumericPageButtons - 1; i >= 0; i--) {
      displayedPageNumbers[i] = pageNumber--;
    }
  } else {
    displayedPageNumbers[0] = currentPage - 1;
    displayedPageNumbers[1] = currentPage;
    displayedPageNumbers[2] = currentPage + 1;
  }

  return (
    <div className={styles.paginator}>
      {currentPage > 1 && (
        <Link className={styles["page-button"]} to={`/page/${currentPage - 1}`}>
          &lt;
        </Link>
      )}
      {displayedPageNumbers[0] > 1 && (
        <span className={styles["spread-separator"]}>...</span>
      )}
      {displayedPageNumbers.map((pageNumber) => (
        <Link
          key={pageNumber}
          className={
            pageNumber === currentPage
              ? `${styles["page-button"]} ${styles["page-button--active"]}`
              : styles["page-button"]
          }
          to={`/page/${pageNumber}`}
        >
          {pageNumber}
        </Link>
      ))}
      {displayedPageNumbers[2] < pages && (
        <>
          <span className={styles["spead-separator"]}>...</span>
          <Link className={styles["page-button"]} to={`/page/${pages}`}>
            {pages}
          </Link>
        </>
      )}
      {currentPage < pages && (
        <Link className={styles["page-button"]} to={`/page/${currentPage + 1}`}>
          &gt;
        </Link>
      )}
    </div>
  );
}
