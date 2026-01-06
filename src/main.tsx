import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";

import { App } from "./App.tsx";
import { EpisodeListPage } from "./pages/episode-list-page/EpisodeListPage.tsx";
import { EpisodeDetailsPage } from "./pages/episode-details-page/EpisodeDetailsPage.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="page?/:pageNumber?" element={<EpisodeListPage />} />
          <Route
            path="page?/:pageNumber?/episode/:episodeId"
            element={<EpisodeDetailsPage />}
          />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
