import styles from "./Paginator.module.css";

export default function Paginator({
  currentPage,
  onChangeCurrentPage,
  pages,
}: {
  currentPage: number;
  onChangeCurrentPage: (pageNumber: number) => void;
  pages: number;
}) {
  // 3 is the maximal number of buttons to be displayed in paginator
  const maxNumericPageButtons = pages < 3 ? pages : 3;
  const displayedPageNumbers: number[] = [];

  const handlePreviousPageClick = () => {
    onChangeCurrentPage(currentPage - 1);
  };

  const handlePageButtonClick = (pageNumber: number) => {
    onChangeCurrentPage(pageNumber);
  };

  const handleNextPageClick = () => {
    onChangeCurrentPage(currentPage + 1);
  };

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
        <button
          className={styles["page-button"]}
          onClick={handlePreviousPageClick}
        >
          &lt;
        </button>
      )}
      {displayedPageNumbers[0] > 1 && (
        <span className={styles["spread-separator"]}>...</span>
      )}
      {displayedPageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={
            pageNumber === currentPage
              ? `${styles["page-button"]} ${styles["page-button--active"]}`
              : styles["page-button"]
          }
          onClick={() => handlePageButtonClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {displayedPageNumbers[2] < pages && (
        <>
          <span className={styles["spead-separator"]}>...</span>
          <button className={styles["page-button"]}>{pages}</button>
        </>
      )}
      {currentPage < pages && (
        <button className={styles["page-button"]} onClick={handleNextPageClick}>
          &gt;
        </button>
      )}
    </div>
  );
}
