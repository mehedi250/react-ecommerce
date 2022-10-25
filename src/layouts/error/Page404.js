import React from 'react'
import { Link } from 'react-router-dom'
import './style.css';
function Page404() {
  return (
 
    <div className="error-container">
      <div className="error-404 xy-center text-center py-5">
          <h2>404 NOT FOUND</h2>
          <p>Oops! The page you requested was not found !</p>
          <Link className="btn btn-primary" to="/">Back to Home</Link>    
      </div>  
    </div>
            
            

  )
}

export default Page404