import { useFetchEpisodeDetails } from "../../query-hooks.ts";
import { EpisodeCharacterList } from "../episode-character-list/EpisodeCharacterList.tsx";

import styles from "./EpisodeDetails.module.css";

export function EpisodeDetails({ episodeId }: { episodeId: string }) {
  const {
    data: episode,
    error,
    isFetching,
  } = useFetchEpisodeDetails(episodeId);

  if (error && !isFetching) {
    throw error;
  }

  return (
    <div className={styles["episode-details-content"]}>
      <p className={styles["episode-description"]}>
        The episode {episode.episode} named as "{episode.name}" was created on{" "}
        {new Date(episode.created).toLocaleString()}. It was released on{" "}
        {episode.air_date}. In this episode there{" "}
        {episode.characters.length > 1 ? "are" : "is"} the following character
        {episode.characters.length > 1 && "s"}:
      </p>
      {episode && <EpisodeCharacterList episode={episode} />}
    </div>
  );
}
