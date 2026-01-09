import type { EpisodeResponse, Episode } from "../types.ts";
import { NotFoundError } from "../errors.ts";

const EPISODE_BASE_API_URL = `${import.meta.env.VITE_BASE_API_URL}/episode/`;

export const fetchEpisodes = async (pageNumber?: number, filter?: string): Promise<EpisodeResponse> => {
  const searchParams = new URLSearchParams();
  if(pageNumber) {
    searchParams.append('page', pageNumber.toString());
  }

  if(filter) {
    new URLSearchParams(filter).forEach((value, key) => { searchParams.append(key, value);});
  }
  
  const url = new URL(EPISODE_BASE_API_URL);
  url.search = searchParams.toString();
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else if(response.status === 404){
    throw new NotFoundError(`There are no episodes for the page: ${pageNumber} matching the filter: ${filter}`)
  } else {
    throw new Error("Sorry, the episodes couldn't be fetched.");
  }
};

export const fetchEpisodeDetails = async (episodeId: string): Promise<Episode> => {
  const url = new URL(episodeId, EPISODE_BASE_API_URL);
  const response = await fetch(url);
  if(response.ok) {
    return response.json();
  } else if(response.status === 404){
    throw new NotFoundError(`There are no details for the episode with id: ${episodeId}`);
  } else {
    throw new Error("Sorry, episode details couldn't be fetched.");
  }
};