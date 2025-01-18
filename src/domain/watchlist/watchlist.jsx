import React, { useState, useEffect } from 'react';
import './watchlist.css';
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import axios from 'axios';


const TMDB_API_KEY = '5e76b51b90290cffa75dede9e7533d60';

function WatchList() {
  const [watchlist, setWatchlist] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; // Number of movies to display per page

  useEffect(() => {
    // Load the watchlist from localStorage
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(storedWatchlist);
  }, []);

  // Save watched movie to playlist in localStorage
  const saveToPlaylist = (movie) => {
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    const isAlreadyInPlaylist = storedPlaylist.some((m) => m.id === movie.id);

    if (!isAlreadyInPlaylist) {
      const updatedPlaylist = [...storedPlaylist, movie];
      localStorage.setItem('playlist', JSON.stringify(updatedPlaylist));
      toast.success(`${movie.title} added to playlist!`);
    } else {
      toast.info(`${movie.title} is already in your playlist.`);
    }
  };

  // Fetch trailer for a movie
  const fetchTrailer = async (movie) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&append_to_response=videos`
      );

      const trailer = response.data.videos.results.find(
        (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
      );

      if (trailer) {
        setVideoUrl(`https://www.youtube.com/embed/${trailer.key}`);
        saveToPlaylist(movie); // Save the movie to the playlist
      } else {
        toast.error('No trailer available for this movie');
      }
    } catch (error) {
      toast.error("Error fetching movie trailer");
      console.error('Error fetching movie trailer:', error);
    }
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (page < Math.ceil(watchlist.length / itemsPerPage)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const startIndex = (page - 1) * itemsPerPage;
  const currentMovies = watchlist.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="watchlist-container">
      <h1 className="watchlist-title">My Watchlist</h1>
      <div className="watchlist">
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => fetchTrailer(movie)}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.title}
                className="movie-image"
              />
            </div>
          ))
        ) : (
          <p className="no-movies">No movies in your watchlist yet.</p>
        )}
      </div>
      <div className="page-controls">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="pagination-number">Page {page}</span>
        <button
          onClick={handleNextPage}
          disabled={page >= Math.ceil(watchlist.length / itemsPerPage)}
          className="pagination-button"
        >
          Next
        </button>
      </div>
     {videoUrl && (
        <div className='modal'>
        <iframe
          src={videoUrl}
          title="Movie Trailer"
          allow="autoplay; encrypted-media"
          // frameBorder="0"
          allowFullScreen
        ></iframe>
        <MdClose onClick={() => setVideoUrl('')} className='close'/>
          {/* <button onClick={() => setVideoUrl('')}>Close</button> */}
        </div>
      )}
    </div>
  );
}

export default WatchList;
