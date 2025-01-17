import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function checkSessionExpiry() {
  const sessionExpiry = sessionStorage.getItem('expirydate'); // Ensure correct key
  if (!sessionExpiry) return false;

  const currentTime = new Date().toTimeString();
  const expiryTime = new Date(sessionExpiry).toTimeString();

  console.log("Current Time:", currentTime);
  console.log("Session Expiry Time:", expiryTime);

  return currentTime > expiryTime;
}

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const navigate = useNavigate();
  const [sessionValid, setSessionValid] = useState(true); // State to track session validity
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const valid = checkSessionExpiry();
      if (!valid) {
        alert('Session expired. Redirecting to login.');
        setBackgroundImage('url(../images/movie2.jpg)')
        sessionStorage.removeItem('sessionId');
        sessionStorage.removeItem('expirydate');
        navigate("/auth/login");
        setSessionValid(false); // Set sessionValid to false when expired
        clearInterval(interval); // Stop checking after session expiry
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [navigate]);

  if (!sessionValid) {
    return null; // Optionally, you can render a loading spinner or message
  }

  // Render children with the default background
  return (
    <div style={{ backgroundImage: backgroundImage, backgroundSize: 'cover', height: '100vh' }}>
      {children}
    </div>
  );
};

export default ProtectedRoute;
