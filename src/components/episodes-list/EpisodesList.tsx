import type { Episode } from "../../types.ts";

import "./EpisodesList.css";

export default function EpisodesList({ episodes }: { episodes: Episode[] }) {
  return (
    <ul className="episodes-list">
      {episodes.map((episode) => (
        <li className="episode-item">
          <div className="episode-card">
            <div>Episode: "{episode.name}"</div>
            <div>Air date: {episode.air_date}</div>
            <div>
              Number of characters in this episode: {episode.characters.length}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
