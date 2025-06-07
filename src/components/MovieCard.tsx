import React from 'react';
import type { Movie } from '../types';

interface Props {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
  onSelect: (imdbID: string) => void;
}

const MovieCard: React.FC<Props> = ({ movie, isFavorite, onToggleFavorite, onSelect }) => {
  return (
    <div className="movie-card" onClick={() => onSelect(movie.imdbID)} style={{ cursor: 'pointer' }}>
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
        alt={movie.Title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering onSelect when clicking the button
            onToggleFavorite(movie);
          }}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
