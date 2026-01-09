import type { Episode } from "../../types";
import { useFetchCharacterList } from "../../query-hooks";

import styles from "./EpisodeCharacterList.module.css";

export function EpisodeCharacterList({ episode }: { episode: Episode }) {
  const characterIdList: string[] = [];
  episode.characters.forEach((characterUrl) => {
    const characterId = characterUrl.split("/").at(-1);

    if (characterId && Number(characterId)) {
      characterIdList.push(characterId);
    }
  });
  const {
    data: characters,
    error,
    isFetching,
  } = useFetchCharacterList(characterIdList);

  if (error && !isFetching) {
    throw error;
  }

  return (
    <>
      {characters && (
        <ul className={styles["character-list"]}>
          {characters.map((character) => (
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
    </>
  );
}
