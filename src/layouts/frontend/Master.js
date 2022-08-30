import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

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