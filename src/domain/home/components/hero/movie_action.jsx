import React, {useState} from 'react';
import { FaPlay, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdClose } from "react-icons/md";


const TMDB_API_KEY = '5e76b51b90290cffa75dede9e7533d60'

function MovieAction({selectedMovie}) {
    const [watchlist, setWatchlist] = useState([]);
    const [movieGenres, setMovieGenres] = useState([]);
    const [videoUrl, setVideoUrl] = useState('');


    const navigate = useNavigate();
    const addMovieToWatchlist = () => {
        const sessionId = sessionStorage.getItem('sessionId');
        if (sessionId) {
            // Retrieve the existing watchlist from sessionStorage
            const existingWatchlist = JSON.parse(localStorage.getItem('watchlist', watchlist)) || [];
            
            // Check if the movie is already in the watchlist
            const isMovieInWatchlist = existingWatchlist.some(movie => movie.id === selectedMovie.id);
            if (isMovieInWatchlist) {
            toast.error('Movie is already in your watchlist');
            return;
            }
        
            // Add the movie to the watchlist
            const updatedWatchlist = [...existingWatchlist, selectedMovie];
            localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
            setWatchlist(updatedWatchlist); // Update local state
            toast.success('Movie added to watchlist');
            
            // Navigate to the /watchlist page
            navigate('/app/watchlist');
        } else {
            toast.error('Please log in first');
            navigate('/auth/login');
        }
        };

    const handleWatchClick = () => {

    if (selectedMovie) {
        fetchMovieTrailer(selectedMovie.id);
        console.log("movie playing")
    } else {
        // alert('Please select a movie to watch.');
        toast.error("Please select a movie to watch.")
        
    }
    };

    const fetchMovieTrailer = async (movieId) => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos`
          );
          const trailer = response.data.videos.results.find(
            (vid) => vid.site === 'YouTube' && vid.type === 'Clip'
            
          );
          // console.log(response.data)
    
          const firstGenre = response.data.genres[0];
          setMovieGenres([firstGenre])
          // console.log(movieGenres);
    
          if (trailer) {
            setVideoUrl(`https://www.youtube.com/embed/${trailer.key}`);
            
          } else {
            // alert('No trailer available for this movie.');
            toast.error("No trailer available for this movie.")
           
          }
        } catch (error) {
          toast.error("Error fetching movie trailer")
          console.error('Error fetching movie trailer:', error);
        }
      };
        
  return (
     <div className='buttons'>
        <button id='watch' onClick={handleWatchClick}>
          <span><FaPlay /></span>Watch
        </button>
        <button id='my-list' onClick={() => addMovieToWatchlist(selectedMovie)}>
          <span><FaPlus /></span>My List
        </button>

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
          
        </div>
      )}
    </div>
  )
}

export default MovieAction