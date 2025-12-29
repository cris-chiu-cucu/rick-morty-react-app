import { Link } from "react-router";

import type { Episode } from "../../types.ts";

import "./EpisodeList.css";

export default function EpisodeList({ episodes }: { episodes: Episode[] }) {
  return (
    <ul className="episodes-list">
      {episodes.map((episode) => (
        <li key={episode.id} className="episode-item">
          <Link className="episode-card" to={`episode/${episode.id}`}>
            <div>Episode: "{episode.name}"</div>
            <div>Air date: {episode.air_date}</div>
            <div>
              Number of characters in this episode: {episode.characters.length}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
