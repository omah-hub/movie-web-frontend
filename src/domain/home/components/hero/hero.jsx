import React, { useState, useEffect } from 'react';
import { FaPlay } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';



import axios from 'axios';
import './hero.css';

import MovieInfo from './movie_info';
import MovieAction from './movie_action';
// import { comment } from 'postcss';


const TMDB_API_KEY = '5e76b51b90290cffa75dede9e7533d60'


const Hero = ({ selectedMovie }) => {
  const [name, setName] = useState('');

  return (
    <div className='container'>
      
      {selectedMovie ? (
        <MovieInfo selectedMovie={selectedMovie}/>
      ) : (
        <div className='title-container'>
          <p className='movie-title'>Select a movie</p>
        </div>
      )}
    <MovieAction selectedMovie={selectedMovie}/>
  </div>
  );
};

export default Hero;



  