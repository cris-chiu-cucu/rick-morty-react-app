import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import Paginator from "../../components/paginator/Paginator.tsx";
import EpisodesList from "../../components/episodes-list/EpisodesList.tsx";
import Loader from "../../components/loader/Loader.tsx";
import ErrorPanel from "../../components/error-panel/ErrorPanel.tsx";
import { fetchEpisodesByPage } from "../../api/episode.ts";

import "./EpisodesPage.css";

export default function Episodes() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isPending, isFetching, isError } = useQuery({
    queryKey: ["episodes", currentPage],
    queryFn: () => fetchEpisodesByPage(currentPage),
  });
  // TODO: check why the component is called 4 times: the first 2 times the component is called because of StrictMode in react
  const pages = data?.info?.pages;

  return (
    // TODO: maybe lift up the Loading and ErrorPanel components to provide the entire application with single components
    <div id="episodes-page-content">
      {isPending && <Loader />}
      {isError && <ErrorPanel errorMessage={error.message} />}
      {data && (
        <>
          <EpisodesList episodes={data.results} />
          {pages && pages > 1 && (
            <Paginator
              currentPage={currentPage}
              onChangeCurrentPage={setCurrentPage}
              pages={pages}
            />
          )}
        </>
      )}
      {isFetching && <div>Fetching content...</div>}
    </div>
  );
}
