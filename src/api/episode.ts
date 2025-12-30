import type { EpisodeResponse, Episode } from "../types.ts";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const fetchEpisodes = async (pageNumber?: number, filter?: string): Promise<EpisodeResponse> => {
  const queryStringList: string[] = [];
  let API_URL = `${BASE_API_URL}/episode`;

  if(pageNumber) {
    queryStringList.push(`page=${pageNumber}`);
  }

  if(filter) {
    queryStringList.push(filter);
  }
  
  if(queryStringList.length) {
    API_URL += `?${queryStringList.join('&')}`;
  }

  const response = await fetch(API_URL);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Sorry, data episodes couldn't be fetched.");
  }
};

export const fetchEpisodeDetails = async (episodeId: string): Promise<Episode> => {
  const response = await fetch(`${BASE_API_URL}/episode/${episodeId}`);
  if(response.ok) {
    return response.json();
  } else {
    throw new Error("Sorry, episode details couldn't be fetched.");
  }
};