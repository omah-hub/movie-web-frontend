import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import './navbar.css';
import axios from 'axios';

function Navbar() {
  const name = localStorage.getItem('name');
  const sessionId = sessionStorage.getItem('sessionId')
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate()
  const handleLogout = async() => {
    try {
      await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true })

      sessionStorage.removeItem(sessionId)
      localStorage.removeItem(name)
      console.log(sessionId)

      navigate('/auth/login')
    } catch(error) {
      console.log('logout failed', error)
    }
    
  }

  return (
    <div className='navbar-container'>
      <h1 className='navbar-logo'>imovies</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/kids">Kids</Link></li>
        <li><Link to="/trends">Trends</Link></li>
        <li><Link to="/upcoming">Upcoming</Link></li>
      </ul>

      <div style={{width: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div className='profile'>
          <CgProfile onClick={toggleMenu} />
          <p id='name'>Welcome, {name ? name : "Guest"}!</p>
        </div>

        <div className={`logout ${menuOpen ? 'show' : ''}`} onClick={toggleMenu}>
          <p onClick={handleLogout}>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
