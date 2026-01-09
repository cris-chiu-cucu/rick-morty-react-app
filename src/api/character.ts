import { NotFoundError } from '../errors';
import type { Character } from '../types';

const CHARACTER_BASE_API_URL = `${import.meta.env.VITE_BASE_API_URL}/character/`;

export const fetchMultipleCharacters = async (characterIdList: string[]): Promise<Character[]> => {
  const response = await fetch(new URL(characterIdList.toString(), CHARACTER_BASE_API_URL));
  if (response.ok) {
    return response.json();
  } else if(response.status === 404) {
    throw new NotFoundError("There are no characters details for the provided character id list.");
  } else {
    throw new Error("Sorry, the characters details couldn't be fetched.");
  }
}