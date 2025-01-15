import React,{ useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../general/navbar';
import { Outlet } from 'react-router-dom';

function Mainlayout() {
 
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      // Apply the default background image for the homepage
      document.body.style.removeProperty('--background-image'); // Reset any previous changes
      document.body.style.backgroundColor = ''; // Clear any solid color
    } else {
      // Apply a solid background color for non-homepage routes
      document.body.style.setProperty('--background-image', 'none');
      document.body.style.backgroundColor = '#121212';
    }
  }, [location.pathname]);
  
  return (
    <div style={{ height: '100vh' }}>
      <Navbar/>
      <Outlet />
    </div>
  );
}

export default Mainlayout;
