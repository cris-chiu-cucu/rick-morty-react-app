import { Suspense } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router";
import { ErrorBoundary } from "react-error-boundary";

import Loader from "./components/loader/Loader.tsx";
import ErrorPanel from "./components/error-panel/ErrorPanel.tsx";

import "./App.css";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <header id="header"></header>
      <main id="content">
        <Suspense fallback={<Loader />}>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary onReset={reset} FallbackComponent={ErrorPanel}>
                <Outlet />
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </Suspense>
      </main>
      <footer id="footer">
        by <b>Cristina Chiu-Cucu</b> 2025
      </footer>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
