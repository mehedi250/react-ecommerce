import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { categoryDeleteApi, categoryListApi } from '../../../service/serviceApi';
import Modal from '../../elements/Modal';
import CategoryAddForm from './CategoryAddForm';
import CategoryUpdateForm from './CategoryUpdateForm';



function Category() {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [show, setShow] = useState(false);
  const [categoryId, setCategoryId] = useState(0);


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

  const onClose = (status = 'close') =>{
    if(status == 'success'){
      getCategoryList();
    }
    setShow(false);
  }

  const handleModal = (isShow=false, newCategoryId = 0) =>{
    setCategoryId(newCategoryId);
    setShow(isShow);
  }
  const renderTableData = () =>{
    let view=[];
    categoryList.map((item) =>{
      view.push(
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.slug}</td>
          <td>
            {(item.status == 1)?
            <span className="m-badge m-badge-success">Active</span>
            :
            <span className="m-badge m-badge-danger">Inactive</span>
            }
            </td>
          <td className='text-center'>
            <button className='btn btn-info btn-sm mx-2' onClick={()=>handleModal(true, item.id)}>Edit</button>
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
  console.log(categoryId)

  return (
    <div className="container-fluid px-4">
      <div className='d-flex'>
          <div>
              <h2>Category List</h2>
          </div>
          <div className='ms-auto'>
              <button to='/admin/category-add' onClick={()=>handleModal(true, 0)} className='btn btn-primary'>Add New</button>
          </div>
      </div>
      <hr />
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Slug</th>
              <th scope="col">status</th>
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
      <Modal title={ categoryId != 0 ?'Update Category': 'Add Catehory'} onClose={onClose} show={show}>
      { categoryId != 0 ?
        <CategoryUpdateForm onClose={onClose} categoryId = {categoryId} />
        :
        <CategoryAddForm onClose={onClose} />
      }
        
      </Modal>
    </div>
  )
}

export default Category