import { http, HttpResponse } from "msw";

import { mockCharacterList } from "./mocked-data/chracters";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const handlers = [
  http.get(`${API_BASE_URL}/character/1`, () => HttpResponse.json(mockCharacterList[0])),

  http.get(`${API_BASE_URL}/character/1,183`, () => HttpResponse.json(mockCharacterList)),
];