import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer';
import '../../assets/frontend/css/style.css';
import '../../assets/frontend/css/skeleton.css';

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