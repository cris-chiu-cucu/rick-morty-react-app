import { useQuery } from "@tanstack/react-query";

import type { Episode } from "../../types";
import { fetchMultipleCharacters } from "../../api/character.ts";
import ErrorPanel from "../error-panel/ErrorPanel.tsx";
import Loader from "../loader/Loader.tsx";

import "./EpisodeDetails.css";

export default function EpisodeDetails({ episode }: { episode: Episode }) {
  const characterIdList: string[] = [];

  episode.characters.forEach((characterUrl) => {
    const characterId = characterUrl.split("/").at(-1);
    if (characterId) {
      characterIdList.push(characterId);
    }
  });

  const { data, error, isPending, isFetching, isError } = useQuery({
    queryKey: ["character", characterIdList],
    queryFn: () => fetchMultipleCharacters(characterIdList),
  });

  return (
    <div className="episode-details-content">
      {isError && error && <ErrorPanel errorMessage={error.message} />}
      {isPending && <Loader />}
      <p className="episode-description">
        The episode {episode.episode} named as "{episode.name}" was created on{" "}
        {new Date(episode.created).toLocaleString()}. It was released on{" "}
        {episode.air_date}. In this episode there{" "}
        {episode.characters.length > 1 ? "are" : "is"} the following character
        {episode.characters.length > 1 && "s"}:
      </p>
      {data && (
        <ul className="character-list">
          {data.map((character) => (
            <li className="character-list-item">
              <div className="character-card">
                <img
                  className="character-img"
                  src={character.image}
                  alt={`image with ${character.name}`}
                  width="150"
                  height="auto"
                />
                <div>
                  <h3 className="character-name">{character.name}</h3>
                  <p className="character-details">
                    <svg
                      className="status"
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
                  <p className="character-details">
                    Origin: <b>{character.origin.name}</b>
                  </p>
                  <p className="character-details">
                    Last seen in: <b>{character.location.name}</b>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {isFetching && <div>Fetching character details...</div>}
    </div>
  );
}
