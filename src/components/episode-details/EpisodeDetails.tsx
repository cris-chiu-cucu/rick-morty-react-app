import { useSuspenseQuery } from "@tanstack/react-query";

import type { Episode } from "../../types";
import { fetchMultipleCharacters } from "../../api/character.ts";

import styles from "./EpisodeDetails.module.css";

export default function EpisodeDetails({ episode }: { episode: Episode }) {
  const characterIdList: string[] = [];

  episode.characters.forEach((characterUrl) => {
    const characterId = characterUrl.split("/").at(-1);

    if (characterId) {
      characterIdList.push(characterId);
    }
  });

  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ["character", characterIdList],
    queryFn: () => fetchMultipleCharacters(characterIdList),
  });

  if (error && !isFetching) {
    throw error;
  }

  return (
    <div className={styles["episode-details-content"]}>
      <p className={styles["episode-description"]}>
        The episode {episode.episode} named as "{episode.name}" was created on{" "}
        {new Date(episode.created).toLocaleString()}. It was released on{" "}
        {episode.air_date}. In this episode there{" "}
        {episode.characters.length > 1 ? "are" : "is"} the following character
        {episode.characters.length > 1 && "s"}:
      </p>
      {data && (
        <ul className={styles["character-list"]}>
          {data.map((character) => (
            <li key={character.id} className={styles["character-list-item"]}>
              <div className={styles["character-card"]}>
                <img
                  className={styles["character-img"]}
                  src={character.image}
                  alt={`image with ${character.name}`}
                  width="150"
                  height="auto"
                />
                <div>
                  <h3 className={styles["character-name"]}>{character.name}</h3>
                  <p className={styles["character-details"]}>
                    <svg
                      className={styles.status}
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="5"
                        cy="5"
                        r="5"
                        fill={character.status === "Alive" ? "green" : "red"}
                      />
                    </svg>
                    <i>
                      {character.status} ({character.species})
                    </i>
                  </p>
                  <p className={styles["character-details"]}>
                    Origin: <b>{character.origin.name}</b>
                  </p>
                  <p className={styles["character-details"]}>
                    Last seen in: <b>{character.location.name}</b>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
