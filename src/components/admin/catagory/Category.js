import React from 'react'
import { Link } from 'react-router-dom';


function Category() {

  return (
    <div className="container-fluid px-4">
        <div className='d-flex'>
            <div>
                <h2>Category List</h2>
            </div>
            <div className='ms-auto'>
                <Link to='/admin/category-add' className='btn btn-primary'>Add New</Link>
            </div>
        </div>

       

    </div>
  )
}

export default Category