import React from 'react'
import { Outlet } from 'react-router-dom';
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import  '../../assets/admin/css/styles.css';


function MasterLayout(props) {
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
              <Sidebar />
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid p-4">
                <Outlet />
              </div>
            </main>
            <Footer />
          </div>
      </div>
    </div>
  )
}

export default MasterLayout
