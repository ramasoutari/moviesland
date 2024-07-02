import { useEffect, useState ,useContext } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import Header from './Header';
import FavoriteMoviesContext from './FavoriteMoviesContext';
const API_URL = 'http://www.omdbapi.com?apikey=605a866f';
function App() {
  const[movies ,setMovies]=useState([]);
  const { favoriteMovies, showFavorites } = useContext(FavoriteMoviesContext);

  
const searchMovies= async (title)=>{
  const response= await fetch(`${API_URL}&s=${title}`);
  const data=await response.json();
  setMovies(data.Search);
}

useEffect(()=>{
 searchMovies();},[]);

 const displayedMovies = showFavorites ? favoriteMovies : movies;

  return (
   <div className='app'>
    <Header onSearch={searchMovies}/>
    <br/>
    <h1>Movies Land</h1>
    {
        displayedMovies?.length > 0 ? (
          <div className='container'>
            {displayedMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.imdbID} />
            ))}
</div>
    ):(
      <div className='empty'>
        <h2>No movies found</h2>
        </div>
    )
   
}
   </div>
  );
}

export default App;

