import React, { useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert';

function Category() {
    const [catagoryInput, setCatagoryInput] = useState({
        slug: '',
        name: '',
        description: '',
        status: '',
        meta_title: '',
        meta_keywords: '',
        meta_description: '',
        error_list: []

    })

    const handleInput = (e) =>{
        e.persist();
        setCatagoryInput({...catagoryInput, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setCatagoryInput({...catagoryInput, error_list: []})
        const data = {
            slug: catagoryInput.slug,
            name: catagoryInput.name,
            description: catagoryInput.description,
            status: catagoryInput.status,
            meta_title: catagoryInput.meta_title,
            meta_keywords: catagoryInput.meta_keywords,
            meta_description: catagoryInput.meta_description
        }
        axios.post('/api/admin/catagory-store', data).then(res => {
            if(res.data.success){
                if(res.data.status === 'success'){
                    document.getElementById("category-form").reset();
                    swal('Success', res.data.message, 'success');
                }
            }
            else{
                if(res.data.status === 'validation-error'){
                    setCatagoryInput({...catagoryInput, error_list: res.data.errors})
                }
                else{
                    swal('Error', res.data.message, 'error');
                }
            }
        });
  

    }



  return (
    <div className="container-fluid px-4">
        <h1>Add Category</h1>
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
                        <input type="text" name="slug" onChange={handleInput} value={catagoryInput.slug} className="form-control" />
                        <span className='text-danger'>{catagoryInput.error_list.slug}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Name</label>
                        <input type="text" name="name" onChange={handleInput} value={catagoryInput.name} className="form-control" />
                        <span className='text-danger'>{catagoryInput.error_list.name}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Description</label> 
                        <textarea name="description" onChange={handleInput} value={catagoryInput.description} className="form-control"></textarea>
                        <span className='text-danger'>{catagoryInput.error_list.description}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Status</label>
                        <input type="checkbox" name="status" value={catagoryInput.status} onChange={handleInput} />  Status 0=shown/1=hidden
                    </div>
                </div>
                <div className="tab-pane card-body border p-4 fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                    <div className="form-group mb-3">
                        <label>Meta Title</label>
                        <input type="text" name="meta_title" value={catagoryInput.meta_title} onChange={handleInput} className="form-control" />
                        <span className='text-danger'>{catagoryInput.error_list.meta_title}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Meta Keywords</label>
                        <textarea name="meta_keywords" value={catagoryInput.meta_keywords} onChange={handleInput} className="form-control"></textarea>
                        <span className='text-danger'>{catagoryInput.error_list.meta_keywords}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Meta Description</label>
                        <textarea name="meta_description" value={catagoryInput.meta_description} onChange={handleInput} className="form-control" ></textarea>
                        <span className='text-danger'>{catagoryInput.error_list.meta_description}</span>
                    </div>
                </div>
            </div>

            <button type='submit' className='btn btn-primary px-4 my-4 float-end'>Submit</button>
        </form>
    </div>
  )
}

export default Category