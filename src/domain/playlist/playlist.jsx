import React, { useEffect, useState } from 'react';
import './playlist.css';
import axios from 'axios';
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

const TMDB_API_KEY = '5e76b51b90290cffa75dede9e7533d60';
const itemsPerPage = 6; // Number of movies per page

function Playlist() {
  const [playlist, setPlaylist] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [page, setPage] = useState(1);

  // Load playlist from localStorage
  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    setPlaylist(storedPlaylist);
  }, []);

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
    if (page < Math.ceil(playlist.length / itemsPerPage)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  // Get movies for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const currentMovies = playlist.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="playlist-container">
      <h1 className="playlist-title">My Playlist</h1>
      <div className="playlist">
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
              <p className="movie-title">{movie.title}</p>
            </div>
          ))
        ) : (
          <p className="no-movies">No movies in your playlist yet.</p>
        )}
      </div>
      {/* Pagination controls */}
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
          disabled={page >= Math.ceil(playlist.length / itemsPerPage)}
          className="pagination-button"
        >
          Next
        </button>
      </div>
      {/* Modal to display trailer */}
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

export default Playlist;
