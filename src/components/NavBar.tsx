// import React from 'react';
// import SearchBar from './SearchBar';

// interface Props {
//   searchQuery: string;
//   setSearchQuery: (query: string) => void;
//   onSearch: () => void;
//   darkMode: boolean;
//   toggleDarkMode: () => void;
//   showFavoritesOnly: boolean;
//   toggleView: () => void;
// }

// const Navbar: React.FC<Props> = ({
//   searchQuery,
//   setSearchQuery,
//   onSearch,
//   darkMode,
//   toggleDarkMode,
//   showFavoritesOnly,
//   toggleView,
// }) => {
//   return (
//     <nav className="navbar">
//       <h1 className="logo">🎬 Movie Explorer</h1>
//       <SearchBar
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         onSearch={onSearch}
//       />
//       <div className="navbar-controls">
//         <button onClick={toggleView} className="toggle-btn">
//           {showFavoritesOnly ? 'Search Results' : 'Favorites Only'}
//         </button>
//         <button onClick={toggleDarkMode} className="theme-toggle">
//           {darkMode ? '🌞' : '🌙'}
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
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
            <button onClick={toggleDarkMode} className="theme-toggle">
              <span className="icon">{darkMode ? '🌞' : '🌙'}</span>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
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