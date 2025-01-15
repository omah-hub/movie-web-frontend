import React, { useState } from 'react';
import Hero from '../components/hero/hero';
import Movies from '../components/movies/movies';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './home.view.css'


function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);

    // Update the background image only on movie selection
    if (movie) {
      document.body.style.setProperty(
        '--background-image',
        `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
      );
    }
  };


 
  console.log("Home component rendered");
  return (
    <div className='home-view'>
      <ToastContainer/>
      <Hero className="hero" selectedMovie={selectedMovie}/>
      <Movies className="movies" onMovieSelect={handleMovieSelect}/>
    </div>
  );
}

export default Home;
