import React from "react";
import type { Movie } from "../types";

interface Props {
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal: React.FC<Props> = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
          role="button"
          onKeyDown={(e) => e.key === "Enter" && onClose()}
        >
          <i className="fas fa-times"></i>
        </button>
        <h2>
          {movie.Title} ({movie.Year})
        </h2>
        <img src={movie.Poster} alt={movie.Title} />
        <p>
          <strong>Genre:</strong> {movie.Genre}
        </p>
        <p>
          <strong>Director:</strong> {movie.Director}
        </p>
        <p>
          <strong>Actors:</strong> {movie.Actors}
        </p>
        <div className="modal-plot">
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
