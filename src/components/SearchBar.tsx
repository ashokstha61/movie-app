// import React from 'react';

// interface Props {
//   searchQuery: string;
//   setSearchQuery: (query: string) => void;
//   onSearch: () => void;
// }

// const SearchBar: React.FC<Props> = ({ searchQuery, setSearchQuery, onSearch }) => {
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSearch();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="search-bar">
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         placeholder="Search for movies..."
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// };

// export default SearchBar;
import React from 'react';

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  year: string;
  setYear: (year: string) => void;
  type: string;
  setType: (type: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  year,
  setYear,
  type,
  setType,
  onSearch,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for movies..."
        className="search-input"
      />
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Release year (e.g., 2020)"
        className="search-input"
        min="1900"
        max={new Date().getFullYear()}
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="search-input"
      >
        <option value="">All Types</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;