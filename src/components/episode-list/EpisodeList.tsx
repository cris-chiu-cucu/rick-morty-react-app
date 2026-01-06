import { Link } from "react-router";

import { useFetchEpisodeList } from "../../query-hooks.ts";
import { Paginator } from "../paginator/Paginator.tsx";

import styles from "./EpisodeList.module.css";

export function EpisodeList({
  currentPage,
  filter,
}: {
  currentPage: number;
  filter: string;
}) {
  const { data, error, isFetching } = useFetchEpisodeList(currentPage, filter);
  const urlQueryString = filter ? `?${filter}` : "";

  const pages = data?.info?.pages;
  const episodes = data?.results;
  if (error && !isFetching) {
    throw error;
  }

  return (
    <>
      {episodes && episodes.length && (
        <ul className={styles["episodes-list"]}>
          {episodes.map((episode) => (
            <li key={episode.id} className={styles["episode-item"]}>
              <Link
                className={styles["episode-card"]}
                to={`episode/${episode.id}`}
              >
                <div>Episode: "{episode.name}"</div>
                <div>Air date: {episode.air_date}</div>
                <div>
                  Number of characters in this episode:{" "}
                  {episode.characters.length}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {episodes && episodes.length === 0 && <div>There are no results</div>}
      {pages && pages > 1 && (
        <Paginator
          currentPage={currentPage}
          pages={pages}
          urlQueryString={urlQueryString}
        />
      )}
    </>
  );
}
