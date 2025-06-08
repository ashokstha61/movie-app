import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  year: string;
  setYear: (year: string) => void;
  type: string;
  setType: (type: string) => void;
  onSearch: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  showFavoritesOnly: boolean;
  toggleView: () => void;
}

const Navbar: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  year,
  setYear,
  type,
  setType,
  onSearch,
  darkMode,
  toggleDarkMode,
  showFavoritesOnly,
  toggleView,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">🎬 Movie Explorer</h1>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            year={year}
            setYear={setYear}
            type={type}
            setType={setType}
            onSearch={onSearch}
          />
          <div className="navbar-controls">
            <button onClick={toggleView} className="toggle-btn">
              <span className="icon">★</span>
              {showFavoritesOnly ? 'Search Results' : 'Favorites Only'}
            </button>
            <button onClick={toggleDarkMode} className="theme-toggle" aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              <FontAwesomeIcon
                icon={darkMode ? faSun : faMoon}
                className="icon"
              />
              {darkMode ? '' : ''} 
            </button>
          </div>
        </div>
        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;