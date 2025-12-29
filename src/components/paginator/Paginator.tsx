import "./Paginator.css";

export default function Paginator({
  currentPage,
  onChangeCurrentPage,
  pages,
}: {
  currentPage: number;
  onChangeCurrentPage: (pageNumber: number) => void;
  pages: number;
}) {
  function handlePreviousPageClick() {
    onChangeCurrentPage(currentPage - 1);
  }

  function handlePageButtonClick(pageNumber: number) {
    onChangeCurrentPage(pageNumber);
  }

  function handleNextPageClick() {
    onChangeCurrentPage(currentPage + 1);
  }

  const maxNumericPageButtons = 3;
  const displayedPageNumbers: number[] = [];

  if (currentPage < maxNumericPageButtons) {
    for (let i = 1; i <= maxNumericPageButtons; i++) {
      displayedPageNumbers.push(i);
    }
  } else if (pages - currentPage < 3) {
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
    <div className="paginator">
      {currentPage > 1 && (
        <button className="page-button" onClick={handlePreviousPageClick}>
          &lt;
        </button>
      )}
      {displayedPageNumbers[0] > 1 && (
        <span className="spread-separator">...</span>
      )}
      {displayedPageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={
            pageNumber === currentPage
              ? "page-button page-button--active"
              : "page-button"
          }
          onClick={() => handlePageButtonClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {displayedPageNumbers[2] < pages && (
        <>
          <span className="spead-separator">...</span>
          <button className="page-button">{pages}</button>
        </>
      )}
      {currentPage < pages && (
        <button className="page-button" onClick={handleNextPageClick}>
          &gt;
        </button>
      )}
    </div>
  );
}
