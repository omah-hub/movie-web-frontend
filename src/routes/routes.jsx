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
import LandingPage from '../domain/landing_page/landing_page';

// Protected Route
import ProtectedRoute from './protectedRoute';

function App() {
  const isAuthenticated = !!sessionStorage.getItem('sessionid'); // Check session ID

  return (
    <Routes>
      {/* Public landing page */}
      <Route path="/" element={<LandingPage />} />

      {/* Public authentication routes */}
      <Route path="auth/signup" element={<Signup />} />
      <Route path="auth/login" element={<Login />} />
      {/* <Route path="auth/landing" element={<LandingPage />} />  */}

      {/* Main layout routes */}
      <Route
        path="app"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="trends" element={<TrendViews />} />
        <Route path="upcoming" element={<UpcomingView />} />
        <Route path="watchlist" element={<WatchList />} />
        <Route path="playlist" element={<Playlist />} />
      </Route>
    </Routes>
  );
}

export default App;
