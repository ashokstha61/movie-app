import React from 'react';
import type { Movie } from '../types';
import MovieCard from './MovieCard';

interface Props {
  favorites: Movie[];
  onToggleFavorite: (movie: Movie) => void;
  onSelect: (movieId: string) => void; // Added this prop
}

const FavoritesList: React.FC<Props> = ({ favorites, onToggleFavorite, onSelect }) => {
  if (favorites.length === 0) {
    return <p className="status">No favorite movies yet.</p>;
  }

  return (
    <div className="favorites-list">
      {favorites.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={true}
          onToggleFavorite={onToggleFavorite}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default FavoritesList;
