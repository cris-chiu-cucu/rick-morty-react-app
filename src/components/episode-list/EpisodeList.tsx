import { Link } from "react-router";

import type { Episode } from "../../types.ts";

import styles from "./EpisodeList.module.css";

export default function EpisodeList({ episodes }: { episodes: Episode[] }) {
  return (
    <ul className={styles["episodes-list"]}>
      {episodes.map((episode) => (
        <li key={episode.id} className={styles["episode-item"]}>
          <Link className={styles["episode-card"]} to={`episode/${episode.id}`}>
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
