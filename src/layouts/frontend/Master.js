import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import '../../assets/frontend/css/login.css';
import '../../assets/frontend/css/style.css';
import Footer from './Footer';

function Master() {
  return (
    <>
    <Navbar />
    <div className="page-content" style={{minHeight: 'calc(100vh - 125px'}}>
        <Outlet />
    </div>
    <Footer />
    </>
  )
}

export default Master