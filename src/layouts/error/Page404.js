import React from 'react'
import { Link } from 'react-router-dom'

function Page404() {
  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6 mx-auto text-center py-5">
                <h2>404 NOT FOUND</h2>
                <p>Oops! The page you requested was not found !</p>
                <Link className="btn btn-primary" to="/">Back to Home</Link>    
            </div>
            
        </div>
    </div>
  )
}

export default Page404