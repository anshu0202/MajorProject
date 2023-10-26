import React from 'react'
import Footer from '../../components/Layout/Footer'
import Layout from '../../components/Layout/Layout'
import SideBar from './SideBarTeacher'
import './SideBar.css'
import { Outlet, useNavigate } from 'react-router-dom';

function Dashboard() {
  return (
    <div className='main'>
      <div className='sideBar'>
        <SideBar />
      </div>
      <div className='footer'>
        {/* <Footer /> */}
      </div>
      <Outlet />
    </div>
  )
}

export default Dashboard
