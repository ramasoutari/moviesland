import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteMoviesContext from './FavoriteMoviesContext';
import './App.css';
import Loading from './Loading';

const DetailsUrl = 'http://www.omdbapi.com/?apikey=605a866f&t=';

const MovieCard = ({ movie }) => {
  const [open, setOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const { addFavoriteMovie, removeFavoriteMovie, favoriteMovies } = useContext(FavoriteMoviesContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isFavorite = favoriteMovies.some(favMovie => favMovie.imdbID === movie.imdbID);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavoriteMovie(movie);
    } else {
      addFavoriteMovie(movie);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(DetailsUrl + movie.Title);
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    if (open && !movieDetails) {
      fetchDetails();
    }
  }, [open, movie.Title, movieDetails]);

  return (
    <div className="movie">
      <div>
        <p>{movie.Year}</p>
      </div>
      <div>
        <img
          src={
            movie.Poster !== 'N/A'
              ? movie.Poster
              : 'https://via.placeholder.com/400'
          }
          alt={movie.Title}
        />
      </div>
      <div>
        <span>{movie.Type}</span>
        <h3>{movie.Title}</h3>
        <Button style={{ color: '#f9c295' }} onClick={handleOpen}>
          Show Details
        </Button>
        <Button onClick={handleFavoriteClick} style={{ color: isFavorite ? 'red' : '#f9c295' }}>
          <FavoriteIcon />
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
        {ReactDOM.createPortal(
          <Modal
            open={open}
            onClose={handleClose}
          >
            <Box
              className="Modal-Box flex"
              sx={{
                padding: '20px',
                color: 'white',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: movieDetails ? `url(${movieDetails.Poster})` : 'none',
              }}
            >
              {movieDetails ? (
                <>
                  <div className="w-1/2 p-5 bg-black bg-opacity-60 rounded-lg">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      <p>{movieDetails.Type}</p>
                      <p>{movieDetails.Year}</p>
                      <h2 className='text-6xl'>{movieDetails.Title}</h2>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <p>
                        Genre:{" "}
                        {movieDetails.Genre && (
                          <span>
                            {movieDetails.Genre.split(", ").map((genre, i) => (
                              <span className="Geners" key={i}>{genre}</span>
                            ))}
                          </span>
                        )}
                      </p>
                      <p>Run Time: {movieDetails.Runtime}</p>
                      <p>Actors: {movieDetails.Actors}</p>
                      <p>Writer: {movieDetails.Writer}</p>
                      <p>Country: {movieDetails.Country}</p>
                      <p>Language: {movieDetails.Language}</p>
                      <p>imdbRating: {movieDetails.imdbRating} <StarBorderIcon /></p>
                      <Typography id="modal-modal-description" sx={{ mt: 8 }}>
                        <p>{movieDetails.Plot}</p>
                      </Typography>
                    </Typography>
                  </div>
                  <div className="w-1/2 p-5">
                    <img
                      src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : 'https://via.placeholder.com/400'}
                      alt={movieDetails.Title}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                </>
              ) : (
               <Loading/>
              )}
            </Box>
          </Modal>,
          document.body
        )}
      </div>
    </div>
  );
};

export default MovieCard;
