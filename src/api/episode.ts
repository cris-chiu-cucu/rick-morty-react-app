import type { EpisodeResponse } from "../types.ts"

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const fetchEpisodesByPage = async (pageNumber?: number): Promise<EpisodeResponse> => {
  const queryString = pageNumber ? `?page=${pageNumber}` : ''
  const response = await fetch(`${BASE_URL}/episode${queryString}`)
  if (response.ok) {
    return response.json()
  } else {
    throw new Error("Sorry, data episodes couldn't be fetched.")
  }
}