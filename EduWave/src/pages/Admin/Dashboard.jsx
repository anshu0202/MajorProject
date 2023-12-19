import React from 'react'
import Footer from '../../components/Layout/Footer'
import Layout from '../../components/Layout/Layout'
// import SideBar from './SideBar'
import SideBarAdmin from './SideBarAdmin'
import './SideBar.css'
import { Outlet, useNavigate } from 'react-router-dom';

function Dashboard() {
  return (
    <div className='main'>
      <div className='sideBar'>
        <SideBarAdmin />
      </div>
      <div className='footer'>
      </div>
      <Outlet />
    </div>
  )
}

export default Dashboard
