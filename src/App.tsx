import React, { useEffect, useState } from 'react';
import './App.css';
import type { Movie, OMDbSearchResponse } from './types';
import MovieList from './components/MovieList';
import FavoritesList from './components/FavoritesList';
import Navbar from './components/NavBar';
import MovieModal from './components/MovieModal';
import LoadingSpinner from './components/LoadingSpinner';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [detailsLoading, setDetailsLoading] = useState<boolean>(false);
  const [detailsError, setDetailsError] = useState<string>('');

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const fetchMovies = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search term.');
      setMovies([]);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const queryParams = new URLSearchParams({
        apikey: API_KEY,
        s: searchQuery,
        ...(year && { y: year }),
        ...(type && { type }),
      });
      const res = await fetch(`https://www.omdbapi.com/?${queryParams}`);
      const data: OMDbSearchResponse = await res.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error || 'No results found.');
        setMovies([]);
      }
    } catch (err) {
      setError((err as string) || 'Something went wrong.');
      setMovies([]);
    }
    setLoading(false);
  };

  const fetchMovieDetails = async (imdbID: string) => {
    setDetailsLoading(true);
    setDetailsError('');
    setSelectedMovie(null);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
      );
      const data = await res.json();
      if (data.Response === 'True') {
        setSelectedMovie(data);
      } else {
        setDetailsError(data.Error || 'Failed to load movie details');
      }
    } catch {
      setDetailsError('Failed to load movie details');
    }
    setDetailsLoading(false);
  };

  const toggleFavorite = (movie: Movie) => {
    const isFav = favorites.some((fav) => fav.imdbID === movie.imdbID);
    if (isFav) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="App">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        year={year}
        setYear={setYear}
        type={type}
        setType={setType}
        onSearch={fetchMovies}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        showFavoritesOnly={showFavoritesOnly}
        toggleView={() => setShowFavoritesOnly(!showFavoritesOnly)}
      />

      {loading && <LoadingSpinner />}
      {error && <p className="status error">{error}</p>}

      {!loading &&
        !error &&
        (showFavoritesOnly ? (
          <FavoritesList
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelect={fetchMovieDetails}
          />
        ) : (
          <MovieList
            movies={movies}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelect={fetchMovieDetails}
          />
        ))}

      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />

      {detailsLoading && <LoadingSpinner />}
      {detailsError && <p className="error">{detailsError}</p>}

      <footer className="footer">
        <p>
          <span className="copyright-symbol">©</span> 2025 Movie Explorer. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;