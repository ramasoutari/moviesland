import React, { createContext, useState } from 'react';

const FavoriteMoviesContext = createContext();

export const FavoriteMoviesProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const addFavoriteMovie = (movie) => {
    if (!favoriteMovies.some((favMovie) => favMovie.imdbID === movie.imdbID)) {
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  };

  const removeFavoriteMovie = (movie) => {
    setFavoriteMovies(favoriteMovies.filter((favMovie) => favMovie.imdbID !== movie.imdbID));
  };

  return (
    <FavoriteMoviesContext.Provider value={{ favoriteMovies, addFavoriteMovie, removeFavoriteMovie, showFavorites, setShowFavorites }}>
      {children}
    </FavoriteMoviesContext.Provider>
  );
};

export default FavoriteMoviesContext;
