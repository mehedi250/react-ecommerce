import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryListApi } from '../../../service/serviceApi';


function Category() {

  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  const getCategoryList = () =>{
    categoryListApi().then(res => {
      if(res.data.success){
        if(res.data.status === 'success'){
          setIsLoading(false)
          setCategoryList(res.data.data)
        }
      }
      else{
        setCategoryList([]);
      }
      
    });
  }

  useEffect(() => {
    getCategoryList();
  }, []);

  const renderTableData = () =>{
    let view=[];
    categoryList.map((item) =>{
      view.push(
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.slug}</td>
          <td>
            <Link to='/admin/category-add' className='btn btn-info btn-sm mx-2'>Edit</Link>
            <Link to='/admin/category-add' className='btn btn-danger btn-sm mx-2'>Delete</Link>
          </td>
        </tr>
      )
    });
    if(view.length == 0){
      return (
        <tr key="1">
          <td colSpan={3} className="text-center py-2">
            No data found!
          </td>
        </tr>);
    }else{
      return view;
    }
  }
  

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
        <hr />
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Slug</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && 
              <tr>
                <td colSpan={3} className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>     
                </td>
              </tr>
   
              }
              {!isLoading && renderTableData()}

            </tbody>
          </table>
        </div>

       

    </div>
  )
}

export default Category