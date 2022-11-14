import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { categoryDeleteApi, categoryListApi } from '../../../service/serviceApi';


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

  const removeCategory = (removeId)=> {
    const newCategory= categoryList.filter((category)=> category.id !== removeId);
    setCategoryList(newCategory);
  };

  const handleDelete = (e, id) =>{
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this information!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        categoryDeleteApi(id).then(res => {
          if(res.data.success){
            if(res.data.status === 'success'){
              swal('Success', res.data.message, 'success');
              removeCategory(id)
            }
          }
          else{
            swal('Error', res.data.message, 'error');
          }
        });
      } else {
       
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
          <td className='text-center'>
            <Link to='/admin/category-add' className='btn btn-info btn-sm mx-2'>Edit</Link>
            <button className='btn btn-danger btn-sm mx-2' onClick={(e)=>handleDelete(e, item.id)}>Delete</button>
          </td>
        </tr>
      )
      return view;
    });
    if(view.length === 0){
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
              <th scope="col" className='text-center'>Action</th>
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