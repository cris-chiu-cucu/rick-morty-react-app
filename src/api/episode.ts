import type { EpisodeResponse, Episode } from "../types.ts"

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const fetchEpisodes = async (pageNumber?: number): Promise<EpisodeResponse> => {
  const queryString = pageNumber ? `?page=${pageNumber}` : ''
  const response = await fetch(`${BASE_API_URL}/episode${queryString}`)
  if (response.ok) {
    return response.json()
  } else {
    throw new Error("Sorry, data episodes couldn't be fetched.")
  }
}

export const fetchEpisodeDetails = async (episodeId: string): Promise<Episode> => {
  const response = await fetch(`${BASE_API_URL}/episode/${episodeId}`)
  if(response.ok) {
    return response.json();
  } else {
    throw new Error("Sorry, episode details couldn't be fetched.")
  }
};