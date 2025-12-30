import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

import Loader from "../../../components/loader/Loader.tsx";
import ErrorPanel from "../../../components/error-panel/ErrorPanel.tsx";
import EpisodeDetails from "../../../components/episode-details/EpisodeDetails.tsx";
import { fetchEpisodeDetails } from "../../../api/episode";

import "./EpisodeDetailsPage.css";

export default function EpisodeDetailsPage() {
  const { episodeId } = useParams();
  const { data, error, isError, isFetching, isPending } = useQuery({
    queryKey: ["episode", episodeId],
    queryFn: () => fetchEpisodeDetails(episodeId!),
    enabled: !!episodeId,
  });

  return (
    <>
      <div className="bread-crumps">
        <Link to="/" className="previous-link">
          Episode List
        </Link>
        {data && (
          <span>
            &nbsp;&gt; Details for Episode: <strong>"{data.name}"</strong>
          </span>
        )}
      </div>
      {isPending && <Loader />}
      {isError && error && <ErrorPanel errorMessage={error.message} />}
      {data && <EpisodeDetails episode={data} />}
      {isFetching && <div>Fetching content...</div>}
    </>
  );
}
