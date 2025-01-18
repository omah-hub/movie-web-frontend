// App.js
import React from 'react';
import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from '../layout/main_layout';

// Views
import Home from "../domain/home/views/home.view";
import TrendViews from '../domain/trends/views/trends.views';
import UpcomingView from '../domain/Upcoming/views/upcoming.view';
import WatchList from '../domain/watchlist/watchlist';
import Playlist from '../domain/playlist/playlist';

// Authentication
import Signup from '../domain/authentication/signup/signup';
import Login from '../domain/authentication/login/login';

// Protected Route
import ProtectedRoute from './protectedRoute';

function App() {
  const isAuthenticated = !!sessionStorage.getItem('sessionid'); // Check session ID

  return (
    <Routes>
      {/* Main layout routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="trends" element={<TrendViews />} />
        <Route path="upcoming" element={<UpcomingView />} />
        <Route path="watchlist" element={<WatchList/>} />
        <Route path='playlist' element={<Playlist/>} />
      </Route>

      {/* Public authentication routes */}
      <Route path="auth/signup" element={<Signup />} />
      <Route path="auth/login" element={<Login />} />
      
    </Routes>
  );
}

export default App;
