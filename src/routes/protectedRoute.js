import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";



function checkSessionExpiry() {
  const sessionExpiry = localStorage.getItem('expirydate');

  if (!sessionExpiry) {
    console.error('Session expiry date is not found in localStorage.');
    return false;
  }

  const currentTime = new Date();
  const expiryTime = new Date(sessionExpiry);

  if (isNaN(expiryTime.getTime())) {
    console.error('Invalid expiry date in localStorage:', sessionExpiry);
    return false;
  }

  // console.log("Current Time:", currentTime.toISOString());
  // console.log("Session Expiry Time:", expiryTime.toISOString());

  return currentTime < expiryTime; // Return true if session is still valid
}


const ProtectedRoute = ({ isAuthenticated, children }) => {
  const navigate = useNavigate();
  const [sessionValid, setSessionValid] = useState(true); // State to track session validity
  

  useEffect(() => {
    const interval = setInterval(() => {
      const valid = checkSessionExpiry();
      if (!valid) {
        alert('Session expired. Redirecting to login...');
        sessionStorage.removeItem('sessionId');
        localStorage.removeItem('expirydate');
        navigate("/auth/login");
        setSessionValid(false); // Set sessionValid to false when expired
        clearInterval(interval); // Stop checking after session expiry
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [navigate]);


  // Render children with the default background
  return (
    <div>
      {children}
    </div>
  );
};

export default ProtectedRoute;
