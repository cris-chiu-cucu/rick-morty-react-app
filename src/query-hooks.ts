import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchEpisodes, fetchEpisodeDetails } from "./api/episode.ts";
import { fetchMultipleCharacters } from "./api/character.ts";
import { NOT_FOUND_ERROR } from "./errors.ts";

const retry = (failureCount: number, error: Error) => {
  // by default useSuspenseQuery has a retry = 3
  if (error.name !== NOT_FOUND_ERROR && failureCount < 3) {
    return true;
  }

  return false;
};

export const useFetchEpisodeList = (currentPage: number, filter: string) => useSuspenseQuery({
  queryKey: ["episodes", currentPage, filter],
  queryFn: () => fetchEpisodes(currentPage, filter),
  retry,
});

export const useFetchEpisodeDetails = (episodeId: string) => useSuspenseQuery({
  queryKey: ["episode", episodeId],
  queryFn: () => fetchEpisodeDetails(episodeId!),
  retry,
});

export const useFetchCharacterList = (characterIdList: string[]) => useSuspenseQuery({
  queryKey: ["character", characterIdList],
  queryFn: () => fetchMultipleCharacters(characterIdList),
  retry,
});