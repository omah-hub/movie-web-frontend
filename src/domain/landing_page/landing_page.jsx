import login from "../../../src/images/landingpage.png"
import signup from "../../../src/images/landingpage2.png"
import home from "../../../src/images/langingpasge3.png"
import upcoming from "../../../src/images/landingpage4.png"
import React from 'react'
import './landing_page.css'
import { useNavigate } from "react-router-dom"




function LandingPage() {
    const navigate = useNavigate()
    const handleLogin = () => {
        navigate('auth/login')
    }
    const handleSignup = () => {
        navigate('auth/signup')
    }
  return (
    <div className='landing-page'>
       <div className="background-picture" style={{top:"0px"}} onClick={handleSignup}>
        <img src={signup} alt="" style={{width: "35rem", height: "20rem"}}/>
       </div>
        <div className="background-picture" style={{right: "0px", top: "0px"}} onClick={handleLogin}>
        <img src={login} alt="" style={{width: "40rem", height: "20rem"}}/>
        </div>
        
        <div className="landing-text-container">
        <p className="landing-text">Click on any of the image to either login or register!</p>
        </div>
    </div>
  )
}

export default LandingPage