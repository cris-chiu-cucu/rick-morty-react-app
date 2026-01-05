import {
  useSuspenseQuery,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { useState } from "react";

import Paginator from "../../components/paginator/Paginator.tsx";
import EpisodeList from "../../components/episode-list/EpisodeList.tsx";
import ErrorPanel from "../../components/error-panel/ErrorPanel.tsx";
import { fetchEpisodes } from "../../api/episode.ts";

import styles from "./EpisodeListPage.module.css";

export default function EpisodeListPage() {
  const { pageNumber } = useParams();
  const currentPage = pageNumber ? Number(pageNumber) : 1;
  const [episodeName, setEpisodeName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ["episodes", currentPage, searchParams.toString()],
    queryFn: () => fetchEpisodes(currentPage, searchParams.toString()),
  });
  const pages = data?.info?.pages;

  if (error && !isFetching) {
    throw error;
  }

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
            onClick={() => {
              setEpisodeName("");
              setSearchParams("");
            }}
          />
        </div>
      </form>
      {data && (
        <>
          <EpisodeList episodes={data.results} />
          {pages && pages > 1 && (
            <Paginator currentPage={currentPage} pages={pages} />
          )}
        </>
      )}
    </div>
  );
}
