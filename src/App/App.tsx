import { Suspense } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router";
import { ErrorBoundary } from "react-error-boundary";

import { Loader } from "../components/loader/Loader.tsx";
import { ErrorPanel } from "../components/error-panel/ErrorPanel.tsx";

import "./App.css";
import headerImage from "../assets/rick-morty-header-title.png";

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <header id="header">
        <img
          id="header-image"
          src={headerImage}
          alt="rick and morthy header title"
          width="375"
        />
      </header>
      <main id="content">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={ErrorPanel}>
              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </main>
      <footer id="footer">
        by <b>Cristina Chiu-Cucu</b> 2025
      </footer>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
