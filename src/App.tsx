import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router";

import "./App.css";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <header id="header"></header>
      <main id="content">
        <Outlet />
      </main>
      <footer id="footer">
        by <b>Cristina Chiu-Cucu</b> 2025
      </footer>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
