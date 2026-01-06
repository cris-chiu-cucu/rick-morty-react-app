import { useParams, useSearchParams } from "react-router";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { useState, Suspense } from "react";

import { NOT_FOUND_ERROR } from "../../errors.ts";
import { EpisodeList } from "../../components/episode-list/EpisodeList.tsx";
import { ErrorPanel } from "../../components/error-panel/ErrorPanel.tsx";
import { Loader } from "../../components/loader/Loader.tsx";

import styles from "./EpisodeListPage.module.css";

export function EpisodeListPage() {
  const { pageNumber } = useParams();
  const currentPage = pageNumber ? Number(pageNumber) : 1;
  const [episodeName, setEpisodeName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClearFilter = () => {
    setEpisodeName("");
    setSearchParams("");
  };
  return (
    <div className={styles["episodes-page-content"]}>
      <form className={styles["filter-container"]}>
        <label htmlFor="episode-name">Filter by episode name:</label>
        <input
          id="episode-name"
          className={styles["episode-name"]}
          value={episodeName}
          onChange={(e) => {
            setEpisodeName(e.target.value);
          }}
        />
        <div>
          <input
            type="button"
            className={styles["action-button"]}
            value="&#10004;"
            onClick={() => {
              setSearchParams(`name=${episodeName}`);
            }}
          />
          <input
            type="reset"
            className={styles["action-button"]}
            value="&#10799;"
            onClick={handleClearFilter}
          />
        </div>
      </form>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            resetKeys={[currentPage, searchParams]}
            fallbackRender={({ error, resetErrorBoundary }) => {
              if (error.name === NOT_FOUND_ERROR) {
                return (
                  <ErrorPanel
                    leftAlign
                    error={{
                      ...error,
                      message: `${error.message}. Please reset the filter and try again.`,
                    }}
                  />
                );
              } else {
                return (
                  <ErrorPanel
                    error={error}
                    resetErrorBoundary={resetErrorBoundary}
                  />
                );
              }
            }}
          >
            <Suspense fallback={<Loader />}>
              <EpisodeList
                currentPage={currentPage}
                filter={searchParams.toString()}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
}
