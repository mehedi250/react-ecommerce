import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

import  '../../assets/admin/css/styles.css';
import  '../../assets/admin//js/scripts';
import { Navigate, Route, Routes } from 'react-router-dom';
import routes from '../../../src/routes/routes'
function MasterLayout(props) {
  console.log(props)
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
              <Sidebar />
          </div>
          <div id="layoutSidenav_content">
            <main>
              <Routes>
                {routes.map((route, idx)=>{
                  return(
                    route.component &&
                    <Route key={idx} path={route.path} exect={route.exect}  element={<route.component {...props} />} />
                  )
                })}
                {/* <Navigate to="/admin/dashboard" /> */}


              </Routes>
              {/* {props.children} */}
            </main>
            <Footer />
          </div>
      </div>
    </div>
  )
}

export default MasterLayout
