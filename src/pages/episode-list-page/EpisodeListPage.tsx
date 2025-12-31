import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

import Paginator from "../../components/paginator/Paginator.tsx";
import EpisodeList from "../../components/episode-list/EpisodeList.tsx";
import { fetchEpisodes } from "../../api/episode.ts";

import styles from "./EpisodeListPage.module.css";

export default function EpisodeListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [episodeName, setEpisodeName] = useState("");
  const [filter, setFilter] = useState("");
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ["episodes", currentPage, filter],
    queryFn: () => fetchEpisodes(currentPage, filter),
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
              setFilter(`name=${episodeName}`);
            }}
          />
          <input
            type="reset"
            className={styles["action-button"]}
            value="&#10799;"
            onClick={() => {
              setEpisodeName("");
              setFilter("");
            }}
          />
        </div>
      </form>
      {data && (
        <>
          <EpisodeList episodes={data.results} />
          {pages && pages > 1 && (
            <Paginator
              currentPage={currentPage}
              onChangeCurrentPage={setCurrentPage}
              pages={pages}
            />
          )}
        </>
      )}
    </div>
  );
}
