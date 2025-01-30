import React, { useState, useEffect } from 'react';
import { MdThumbUpAlt, MdThumbDownAlt } from "react-icons/md";
import { toast } from "react-toastify";
import axios from 'axios';

import CommentModal from './comment_modal'

const MovieInfo = ({ selectedMovie }) => {
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);
  const [reactions, setReactions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [reactionTrigger, setReactionTrigger] = useState(false);
  
    
    
    
    
  const openModal = async () => {
          
    setIsModalVisible(true); // Make modal visible
    setTimeout(() => setIsModalOpen(true), 100); // Allow animation to start
    
    try {
      
      const response = await axios.get(`http://localhost:5000/api/getComment/${selectedMovie.id}`)
      if (response.status === 200) {
        console.log(response.data.data)
        setComments(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  };

   
  useEffect(() => {
    const fetchReactions = async () => {
      if (selectedMovie?.id) {
        // localStorage.setItem('movieId', selectedMovie.id);
      
        try {
          const response = await axios.get(`http://localhost:5000/api/reactions/${selectedMovie.id}`)
          console.log(response); 
          if (response.status === 200) {
            console.log(response.data)
            setReactions(response.data.data)
            
            
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchReactions()
    
  }, [selectedMovie,  reactionTrigger]);

  const handleLikeClick = async (movieId) => {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      toast.error("Please log in to react to movies.");
      return;
    }
  
    try {
      // Send the like reaction to the backend
      const response = await axios.post('http://localhost:5000/api/addReaction', {
        userId,
        movieId,
        reactionType: 'like',
      });
  
      toast.success(response.data.message);
      setReactionTrigger(prev => !prev);
  
     
    } catch (error) {
      
      console.error(error);
    }
  };
  
  
    
  const handleDislikeClick = async (movieId) => {
    const userId = localStorage.getItem('userId'); // Ensure the user ID is stored in localStorage

    if (!userId) {
      toast.error("Please log in to react to movies.");
      return;
    }
  

    try {
      const response = await axios.post('http://localhost:5000/api/addReaction', {
          userId,
          movieId,
          reactionType: 'dislike',
      });

      toast.success(response.data.message);
      setReactionTrigger(prev => !prev);
    } catch (error) {
      toast.error("Failed to add reaction. Please try again.");
      console.error(error);

   
  }
   
  };

    
      
     

      
  return (
    <div>
        <div className='selected-movie'>
        <div className='selected-movie-container'>
        <p className='selected-movie-title'>{selectedMovie.title}</p>
        </div>
        <div className='movie-properties'>
        <p>{selectedMovie.release_date}</p>
        {/* <p id='rated'>{selectedMovie.vote_count}</p> */}
        <div className='like-count'>
            <p style={{color: "white"}}>{reactions.likes?.length}</p>
            
            <MdThumbUpAlt className={`dislikes-icon ${likeClicked ? 'bg-white' : 'bg-black'}`}
            onClick={() => handleLikeClick(selectedMovie.id)}/>
        </div>
        <div className='like-count'>
            <p>{reactions.dislikes?.length}</p>
            <MdThumbDownAlt className={`dislikes-icon ${dislikeClicked ? 'bg-white' : 'bg-black'}`}
            onClick={() => handleDislikeClick(selectedMovie.id)}/>
        </div>
        <p onClick={openModal} style={{cursor: "pointer"}}>Comments</p>
        {/* <p>{movieGenres[0]?.name || 'No Genre Available'}</p> */}

        
        </div>
        <p className='about'>{selectedMovie.overview}</p>
    </div>
    {isModalVisible && (
        <CommentModal   isModalOpen={isModalOpen}
        isModalVisible={isModalVisible}
        closeModal={() => setIsModalVisible(false)}// Function to close the modal
        selectedMovie={selectedMovie}
        setIsModalOpen={setIsModalOpen}
        setIsModalVisible={setIsModalVisible}
        comments={comments}
        setComments={setComments}/>
  )}
    </div>
  )
}

export default MovieInfo