import type { Character } from '../types';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const fetchMultipleCharacters = async (characterIdList: string[]): Promise<Character[]> => {
  const response = await fetch(`${BASE_API_URL}/character/${characterIdList}`)
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Sorry, the characters details couldn't be fetched.");
  }
}