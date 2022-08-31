import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import '../../assets/frontend/css/login.css';

function Master() {
  return (
    <>
    <Navbar />
    <div className="page-content">
        <Outlet />
    </div>
    </>
  )
}

export default Master