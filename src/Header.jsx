import React, { useState, useContext } from 'react';
import './App.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteMoviesContext from './FavoriteMoviesContext';

function Header({ onSearch }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { setShowFavorites, showFavorites } = useContext(FavoriteMoviesContext);

  const handleSearchClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleFavoritesClick = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <header className="header">
      <div className="header-content">
        <h2>Welcome to <span>Movies Land </span><br /> Your One-Stop Shop for <span>All Things</span> Movies!</h2>
        <div className="buttons-container">
          <button onClick={handleSearchClick}>
            <SearchIcon />
            {showSearchBar ? 'Close Search' : 'Search for Movies'}
          </button>
          <button className='favourite-button' onClick={handleFavoritesClick}>
            <FavoriteIcon />
            {showFavorites ? 'Show All Movies' : 'My Favorite List'}
          </button>
        </div>
      </div>
      {showSearchBar && (
        <div className='search'>
          <input
            placeholder='Search for movies'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon onClick={() => onSearch(searchTerm)} />
        </div>
      )}
    </header>
  );
}

export default Header;
