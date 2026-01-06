import { Suspense } from "react";
import { useParams, Link } from "react-router";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { NOT_FOUND_ERROR } from "../../errors.ts";
import { EpisodeDetails } from "../../components/EpisodeDetails.tsx";
import { ErrorPanel } from "../../components/error-panel/ErrorPanel.tsx";

import styles from "./EpisodeDetailsPage.module.css";

export function EpisodeDetailsPage() {
  const { episodeId } = useParams();

  return (
    <>
      <div className={styles["bread-crumps"]}>
        <Link relative="path" to="../.." className={styles["previous-link"]}>
          Episode List
        </Link>
        <span>&nbsp;&gt;</span>
      </div>
      {episodeId && (
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ error, resetErrorBoundary }) => {
                if (error.name === NOT_FOUND_ERROR) {
                  return (
                    <ErrorPanel
                      leftAlign
                      error={{
                        ...error,
                        message: `${error.message}. Please navigate to Episode List page.`,
                      }}
                    />
                  );
                } else {
                  return (
                    <ErrorPanel
                      error={error}
                      resetErrorBoundary={resetErrorBoundary}
                    />
                  );
                }
              }}
            >
              <Suspense>
                <EpisodeDetails episodeId={episodeId} />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      )}
    </>
  );
}
