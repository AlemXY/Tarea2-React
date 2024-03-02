import React, { useState, useEffect } from "react";
import { CharacterInfo } from "./CharacterInfo";
import "../../styles/CharacterList.css";

export const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results))
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  const openInfo = (character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  const closeInfo = () => {
    setSelectedCharacter(null);
    setShowModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Alive":
        return "green";
      case "Dead":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="CharacterList">
      <h1 className="center">Rick and Morty Characters</h1>
      <div className="characters">
        {characters.map((character) => (
          <div
            className="character"
            key={character.id}
            onClick={() => openInfo(character)}
          >
            <img src={character.image} alt={character.name} />
            <div className="character-info">
              <h2>{character.name}</h2>
              <p>
                Status:{" "}
                <span
                  style={{
                    color: getStatusColor(character.status),
                    marginRight: "5px",
                  }}
                >
                  ●
                </span>
                {character.status}
              </p>
              <p>Species: {character.species}</p>
              <p>Location: {character.location.name}</p>
              <p>First Seen: {getFirstEpisode(character)}</p>
              <p>Type: {character.type || "Unknown"}</p>
            </div>
          </div>
        ))}
      </div>
      {showModal && selectedCharacter && (
        <CharacterInfo character={selectedCharacter} closeInfo={closeInfo} />
      )}
    </div>
  );
};

const getFirstEpisode = (character) => {
  if (character.episode && character.episode.length > 0) {
    const firstEpisode = character.episode[0];
    const episodeNumber = firstEpisode.substring(
      firstEpisode.lastIndexOf("/") + 1
    );
    return `Episode ${episodeNumber}`;
  }
  return "Unknown";
};
