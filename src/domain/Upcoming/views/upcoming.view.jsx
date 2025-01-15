import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Upcoming from '../components/upcoming'
import './upcoming_views.css';

function UpcomingView() {
  return (
    <div className='upcoming_views'>
        <ToastContainer/>
        <Upcoming/>
    </div>
  )
}

export default UpcomingView