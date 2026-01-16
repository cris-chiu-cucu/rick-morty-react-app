import { describe, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";

import { EpisodeCharacterList } from "./EpisodeCharacterList.tsx";
import { Loader } from "../loader/Loader.tsx";
import { mockEpisodeWith1Character } from "../../mocks/mocked-data/episodes.ts";
import { mockCharacterList } from "../../mocks/mocked-data/chracters.ts";

const wrapper = ({ children }: { children: React.ReactNode }) => {
  // todo: set retry: false for tests
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // disable retries for tests
        retry: false,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </QueryClientProvider>
    </>
  );
};

describe("renders episode related character list cards", () => {
  test("renders 1 character card for the episode with 1 character", async () => {
    const screen = await render(
      <EpisodeCharacterList episode={mockEpisodeWith1Character} />,
      { wrapper }
    );
    const characterListElement = screen.getByRole("list");
    const characterListItems = screen.getByRole("listitem");
    await expect.element(characterListElement).toBeInTheDocument();
    await expect
      .element(characterListElement)
      .toContainElement(characterListItems);
    await expect.element(characterListItems).toHaveLength(1);
    await expect
      .element(screen.getByAltText(`image with ${mockCharacterList[0].name}`))
      .toBeInTheDocument();
  });
});
