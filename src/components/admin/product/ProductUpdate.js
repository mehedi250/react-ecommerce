import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { categoryFindApi, categoryUpdateApi } from '../../../service/serviceApi';

function ProductUpdate(props) {
    const params = useParams();
    const navigate = useNavigate();

    const initialData = {
        slug: '',
        name: '',
        description: '',
        status: '',
        meta_title: '',
        meta_keywords: '',
        meta_description: '',
        error_list: []
    }
    const [categoryInput, setCategoryInput] = useState(initialData);
    const [error_list, setErrorList] = useState([])

    useEffect(()=> {
        getCurrentData(params.id);
    }, [params.id])

    const getCurrentData = (id) =>{
        categoryFindApi(id, []).then(res => {
            if(res.data.success){
                if(res.data.status === 'success'){
                    setCategoryInput(res.data.data);
                }
            }
            else{
                swal('Error', res.data.message, 'error');
            }
        });
    }

    const handleInput = (e) =>{
        e.persist();
        setCategoryInput({...categoryInput, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setCategoryInput({...categoryInput, error_list: []})
        const data = {
            slug: categoryInput.slug,
            name: categoryInput.name,
            description: categoryInput.description,
            status: categoryInput.status,
            meta_title: categoryInput.meta_title,
            meta_keywords: categoryInput.meta_keywords,
            meta_description: categoryInput.meta_description
        }

        categoryUpdateApi(params.id, data).then(res => {
            if(res.data.success){
                if(res.data.status === 'success'){
                    swal('Success', res.data.message, 'success');
                    navigate('/admin/category');
                }
            }
            else{
                if(res.data.status === 'validation-error'){
                    setErrorList(res.data.errors)
                }
                else{
                    swal('Error', res.data.message, 'error');
                }
            }
        });
    }

  return (
    <div className="container-fluid px-4">
        <div className='d-flex'>
            <div>
                <h2>Update Product</h2>
            </div>
            <div className='ms-auto'>
                <Link to='/admin/category' className='btn btn-primary '>Back</Link>
            </div>
        </div>
       
        <form onSubmit={handleSubmit} id="category-form">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane card-body border p-4 fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="form-group mb-3">
                        <label>Slug</label>
                        <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
                        <span className='text-danger'>{error_list.slug}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Name</label>
                        <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                        <span className='text-danger'>{error_list.name}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Description</label> 
                        <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>
                        <span className='text-danger'>{error_list.description}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Status</label>
                        <input type="checkbox" name="status" value={categoryInput.status} onChange={handleInput} />  Status 0=shown/1=hidden
                    </div>
                </div>
                <div className="tab-pane card-body border p-4 fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                    <div className="form-group mb-3">
                        <label>Meta Title</label>
                        <input type="text" name="meta_title" value={categoryInput.meta_title} onChange={handleInput} className="form-control" />
                        <span className='text-danger'>{error_list.meta_title}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Meta Keywords</label>
                        <textarea name="meta_keywords" value={categoryInput.meta_keywords} onChange={handleInput} className="form-control"></textarea>
                        <span className='text-danger'>{error_list.meta_keywords}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Meta Description</label>
                        <textarea name="meta_description" value={categoryInput.meta_description} onChange={handleInput} className="form-control" ></textarea>
                        <span className='text-danger'>{error_list.meta_description}</span>
                    </div>
                </div>
            </div>
            <button type='submit' className='btn btn-primary px-4 my-4 float-end'>Update</button>
        </form>
    </div>
  )
}

export default ProductUpdate