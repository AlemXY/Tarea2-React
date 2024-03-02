import React, { useState, useEffect } from "react";
import "../../styles/CharacterList.css";
import "../../styles/CharacterInfo.css";

export const CharacterInfo = ({ character, closeInfo }) => {
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setImageLoading(false);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
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
    <div className="Info-overlay" onClick={closeInfo}>
      <div className="Info-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeInfo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59 5.59-5.59z" />
          </svg>
        </button>
        <h2 className="center">{character.name}</h2>
        {imageLoading ? (
          <p>Loading image...</p>
        ) : (
          <img
            className="character-image"
            src={character.image}
            alt={character.name}
            onLoad={handleImageLoaded}
            onError={handleImageError}
          />
        )}
        <p>
          Status:{" "}
          <span className={`status-dot ${getStatusColor(character.status)}`} />{" "}
          {character.status}
        </p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <p>Origin: {character.origin.name}</p>
        <p>Location: {character.location.name}</p>
        <p>First Seen in: {getFirstEpisode(character)}</p>
        <p>Created on: {character.created}</p>
        <h3>Episodes:</h3>
        <ul>
          {character.episode.map((episode, index) => (
            <li key={index}>{episode}</li>
          ))}
        </ul>
      </div>
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
