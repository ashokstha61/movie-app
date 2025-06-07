import React from 'react';
import type { Movie } from '../types';
import MovieCard from './MovieCard';

interface Props {
  movies: Movie[];
  favorites: Movie[];
  onToggleFavorite: (movie: Movie) => void;
  onSelect: (imdbID: string) => void;
}

const MovieList: React.FC<Props> = ({ movies, favorites, onToggleFavorite, onSelect }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
          onToggleFavorite={onToggleFavorite}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default MovieList;
