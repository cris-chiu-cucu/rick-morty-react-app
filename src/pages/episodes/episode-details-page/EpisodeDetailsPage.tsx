import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

import EpisodeDetails from "../../../components/episode-details/EpisodeDetails.tsx";
import { fetchEpisodeDetails } from "../../../api/episode.ts";

import styles from "./EpisodeDetailsPage.module.css";

export default function EpisodeDetailsPage() {
  const { episodeId } = useParams();
  const { data, error, isFetching } = useQuery({
    queryKey: ["episode", episodeId],
    queryFn: () => fetchEpisodeDetails(episodeId!),
    enabled: !!episodeId,
  });

  if (error && !isFetching) {
    throw error;
  }

  return (
    <>
      <div className={styles["bread-crumps"]}>
        <Link to="/" className={styles["previous-link"]}>
          Episode List
        </Link>
        {data && (
          <span>
            &nbsp;&gt; Details for Episode: <strong>"{data.name}"</strong>
          </span>
        )}
      </div>
      {data && <EpisodeDetails episode={data} />}
    </>
  );
}
