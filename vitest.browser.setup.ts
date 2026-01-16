import { beforeAll, afterEach, afterAll } from 'vitest';
import { cleanup } from "vitest-browser-react";

import { worker } from "./src/mocks/worker.ts";

beforeAll(() => worker.start());
afterEach(() => {
  worker.resetHandlers();
  cleanup();
});
afterAll(() => worker.stop());
