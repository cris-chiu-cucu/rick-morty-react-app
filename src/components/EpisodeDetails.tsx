import { useFetchEpisodeDetails } from "../query-hooks.ts";
import { EpisodeCharacterList } from "./episode-character-list/EpisodeCharacterList.tsx";

export function EpisodeDetails({ episodeId }: { episodeId: string }) {
  const { data, error, isFetching } = useFetchEpisodeDetails(episodeId);

  if (error && !isFetching) {
    throw error;
  }

  return <>{data && <EpisodeCharacterList episode={data} />}</>;
}
