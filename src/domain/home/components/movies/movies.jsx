import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./movies.css";

const Movies = ({ onMovieSelect }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=5e76b51b90290cffa75dede9e7533d60&page=${page}`
        );
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]); // Append new movies
        setLoading(false);
        // console.log(response.data)
      } catch (err) {
        setError('Failed to fetch movies');
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page]); // Trigger fetch when `page` changes

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop === clientHeight && !loading) {
      setPage((prevPage) => prevPage + 1); // Load the next page
    }
  };

  // if (error) return <div style={{color: "white"}}>Error: {error}</div>;

  return (
    <div 
      className="slider-container" 
      onScroll={handleScroll}
    >
      {loading && <div style={{color: "white"}}>Loading...</div>}
      {error && !loading && <div style={{color: "white"}}>Error...</div>}
      {!loading && !error && movies.map((movie) => (
        <div 
          key={movie.id} 
          className="slider-item" 
          onClick={() => onMovieSelect(movie)}
        >
          <img 
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/200x200?text=No+Image"
            } 
            alt={movie.title} 
            className="slider-image" 
          />
        </div>
      ))}
    </div>
  );
  
};

export default Movies;
