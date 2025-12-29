import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import EpisodesPage from "./pages/episodes-page/EpisodesPage.tsx";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <header id="header"></header>
      <main id="content">
        <EpisodesPage />
      </main>
      <footer id="footer">
        by <b>Cristina Chiu-Cucu</b> 2025
      </footer>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
