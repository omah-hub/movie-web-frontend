import React from 'react'
import Trends from '../components/trends'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './trends.css'

function TrendViews() {
  return (
    <div className='trend_view'>
      <ToastContainer/>
        <Trends/>
    </div>
  )
}

export default TrendViews