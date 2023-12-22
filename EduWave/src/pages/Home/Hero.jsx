import React from 'react'
import { NavLink } from 'react-router-dom';
import './css/index.css'
function Hero() {
  return (
    <>
        <div className="hero">
            <div style={{marginTop:"20px"}} className="content-1">
            
            <h2>Are you feeling stressed about the exams?
            <span>
              <img src="https://i.postimg.cc/QM10tKX2/ezgif-com-gif-maker-1.gif" alt="" srcset="" />
            </span></h2>
            <img src="https://i.postimg.cc/mrC7Cnhh/image-removebg-preview-2.png" alt="" />
            <h1>Ace your exams with our comprehensive notes and pyq</h1>
            <h2>Unlock your full potential with our in-depth notes and pyq</h2>
            <div className="hero-button">
            <NavLink exact to="/studentDashboard">
            <button className="notes">Student</button>
            </NavLink>

            <NavLink exact to="/teacherDashboard">
            <button className="py">Teacher</button>
            </NavLink>
              
              
            </div>
            </div>
            <div className="content-2">
                <img src="https://i.postimg.cc/ZR437hKB/Background-1-removebg-preview.png" alt="" srcset="" />
            </div>
        </div>
        
    </>
  )
}

export default Hero
