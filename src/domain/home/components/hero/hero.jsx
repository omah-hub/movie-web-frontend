import React, { useState } from 'react';
import { FaPlay } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

import './hero.css';


const TMDB_API_KEY = '5e76b51b90290cffa75dede9e7533d60'

const Hero = ({ selectedMovie }) => {
  const [videoUrl, setVideoUrl] = useState('');
  // const [movieDuration, setMovieDuration] = useState(null);
  const [movieGenres, setMovieGenres] = useState([]);

  

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
  

  const handleWatchClick = () => {
  
    if (selectedMovie) {
      fetchMovieTrailer(selectedMovie.id);
      console.log("movie playing")
    } else {
      // alert('Please select a movie to watch.');
      toast.error("Please select a movie to watch.")
      
    }
  };

  // const handleAddToList = async (list_id) => {
  //   const sessionId = localStorage.getItem('tmdbSessionId')
  //   const movieId = selectedMovie?.id;
  //   // console.log(sessionId)

  //   if (!sessionId) {
  //     alert('you need to login first!');
  //     navigate('/auth')
  //     return;
  //   };
  //   if (!movieId) {
  //     toast.error("Please select a movie to add to the list.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       `https://api.themoviedb.org/3/list/list_id/add_item`,
  //       { media_id: movieId },
  //       { params: { api_key: TMDB_API_KEY, session_id: sessionId } }
  //     );

  //     if (response.data.status_code === 12) {
  //       alert('Movie added successfully')
  //       navigate('/list')
  //     } else {
  //       alert('failed to add movie')
  //     }
  //   } catch (error) {
  //     alert('Error occured')
  //   }
  // }

  return (
    <div className='container'>
      
      {selectedMovie ? (
        <div className='selected-movie'>
          <p className='movie-title'>{selectedMovie.title}</p>
          <div className='movie-properties'>
            <p>{selectedMovie.release_date}</p>
            <p id='rated'>{selectedMovie.vote_count}</p>
            <p>2h 14min</p>
            <p>{movieGenres[0]?.name || 'No Genre Available'}</p>


            
          </div>
          <p className='about'>{selectedMovie.overview}</p>
        </div>
      ) : (
        <p className='movie-title'>Select a movie</p>
      )}

      <div className='buttons'>
        <button id='watch' onClick={handleWatchClick}>
          <span><FaPlay /></span>Watch
        </button>
        <button id='my-list'>
          <span><FaPlus /></span>My List
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
};

export default Hero;
