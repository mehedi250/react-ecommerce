import React, { useState } from 'react'
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { categoryDeleteApi, categoryDropdoenApi, productListApi } from '../../../service/serviceApi';
import Modal from '../../elements/Modal';
import ProductAdd from './ProductAdd';
import useDelayCallback from '../../helpers/useDelayCallback';


function Product() {
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [show, setShow] = useState(false);  //show of hide modal
  const [productId, setProductId] = useState(0);
  const DEFAULT_CATEGORY = {label: 'Select Category', value: ''};
  const [categoryList, setCategoryList] = useState([DEFAULT_CATEGORY]);
  

  useDelayCallback(() => {
    getProductList();
    getCategoryDropdown();
  }, []);

  const getProductList = () =>{
    productListApi().then(res => {
      if(res.data.success){
        if(res.data.status === 'success'){
          setIsLoading(false)
          setProductList(res.data.data)
        }
      }
      else{
        setProductList([]);
      }
    });
  }

  const removeProduct = (removeId)=> {
    const newProduct= productList.filter((product)=> product.id !== removeId);
    setProductList(newProduct);
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
              removeProduct(id)
            }
          }
          else{
            swal('Error', res.data.message, 'error');
          }
        });
      } 
    });
  }

  const onClose = (status = 'close') =>{
    if(status === 'success'){
      getProductList();
    }
    setShow(false);
  }

  const handleModal = (isShow=false, newProductId = 0) =>{
    setProductId(newProductId);
    setShow(isShow);
  }
  
  const renderTableData = () =>{
    let view=[];
    productList.map((item) =>{

      view.push(
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.slug}</td>
          <td>{item.category.name}</td>
          <td>
            {(item.status === 1)?
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
          <td colSpan={4} className="text-center py-2">
            No data found!
          </td>
        </tr>);
    }else{
      return view;
    }
  }

  const getCategoryDropdown = () =>{
      categoryDropdoenApi().then(res => {
        if(res.data.success){
            if(res.data.status === 'success'){
                let allOptions = [];
                if (res.data.data.length > 0) {
                    allOptions = res.data.data.map(item => {
                        return {
                            value: item.id,
                            label: item.name
                        }
                    });
                    setCategoryList([DEFAULT_CATEGORY, ...allOptions]);
                } 
            }    
        }
    }).catch(error => {
        console.log('something is wrong' + error)
        
    });
}

  return (
    <div className="container-fluid px-4">
      <div className='d-flex'>
          <div>
              <h2>Product List</h2>
          </div>
          <div className='ms-auto'>
              <button onClick={()=>handleModal(true, 0)} className='btn btn-primary'><FontAwesomeIcon icon="fa fa-plus" />  New</button>
          </div>
      </div>
      <hr />
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Slug</th>
              <th scope="col">Category</th>
              <th scope="col">status</th>
              <th scope="col" className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && 
            <tr>
              <td colSpan={5} className="text-center">
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

      <Modal title={ productId !== 0 ?'Update Product': 'Add Product'} onClose={onClose} show={show}>
        <ProductAdd onClose={onClose} categoryList={categoryList} productId = {productId} />
      </Modal>
    </div>
  )
}

export default Product