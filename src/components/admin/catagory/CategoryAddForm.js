import React, { useState } from 'react'
import { useEffect } from 'react';
import swal from 'sweetalert';
import { categoryInsertApi } from '../../../service/serviceApi';
import Switch from '../../elements/Switch';

function CategoryAddForm(props) {
    const initialData = {
        slug: '',
        name: '',
        description: '',
        meta_title: '',
        meta_keywords: '',
        meta_description: '',
        error_list: []
    }
    const [categoryInput, setCategoryInput] = useState(initialData)
    const [status, setStatus] = useState(true);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setTimeout(
            setLoader(false)
        );
    }, []);

    const handleInput = (e) =>{
        e.persist();
        setCategoryInput({...categoryInput, [e.target.name]: e.target.value})
    }

    const handleName = (e) =>{
        e.persist();
        let tempSlug = e.target.value;
        tempSlug = tempSlug.toString()
        .normalize('NFD')                   // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, '-');

        const tempData = {name: e.target.value, slug: tempSlug};
        setCategoryInput({...categoryInput, ...tempData})
    }

    const handleStatus = () =>{
        setStatus(!status)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setCategoryInput({...categoryInput, error_list: []})
        const data = {
            slug: categoryInput.slug,
            name: categoryInput.name,
            description: categoryInput.description,
            status: status,
            meta_title: categoryInput.meta_title,
            meta_keywords: categoryInput.meta_keywords,
            meta_description: categoryInput.meta_description
        }

        categoryInsertApi(data).then(res => {
            if(res.data.success){
                if(res.data.status === 'success'){
                    swal({
                        title: "Success",
                        text: res.data.message,
                        icon: "success",
                        buttons: false,
                        timer: 1500
                    })
                    props.onClose('success')
                }
            }
            else{
                if(res.data.status === 'validation-error'){
                    setCategoryInput({...categoryInput, error_list: res.data.errors})
                }
                else{
                    swal({title: 'Error', text: res.data.message, icon: 'error', timer: 2000, buttons: false, });
                }
            }
        });
    }

  return (
    <div>
        {loader === true ?
        <div className="text-center py-5">
            <div className="text-center">
                <div className="spinner-grow mx-auto" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>    
            </div>
        </div>
        :
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
                <div className="tab-pane  py-4 fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="form-group mb-3">
                        <label>Name</label>
                        <input type="text" name="name" onChange={handleName} value={categoryInput.name} className="form-control" />
                        <span className='text-danger'>{categoryInput.error_list.name}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Slug</label>
                        <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
                        <span className='text-danger'>{categoryInput.error_list.slug}</span>
                    </div>
                    
                    <div className="form-group mb-3">
                        <label>Description</label> 
                        <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>
                        <span className='text-danger'>{categoryInput.error_list.description}</span>
                    </div>
                    <div className="form-group mb-3">
                            <label>Status</label>
                            <Switch isOn={status} handleToggle={handleStatus}  />   
                    </div>
                </div>
                <div className="tab-pane py-4 fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                    <div className="form-group mb-3">
                        <label>Meta Title</label>
                        <input type="text" name="meta_title" value={categoryInput.meta_title} onChange={handleInput} className="form-control" />
                        <span className='text-danger'>{categoryInput.error_list.meta_title}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Meta Keywords</label>
                        <textarea name="meta_keywords" value={categoryInput.meta_keywords} onChange={handleInput} className="form-control"></textarea>
                        <span className='text-danger'>{categoryInput.error_list.meta_keywords}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Meta Description</label>
                        <textarea name="meta_description" value={categoryInput.meta_description} onChange={handleInput} className="form-control" ></textarea>
                        <span className='text-danger'>{categoryInput.error_list.meta_description}</span>
                    </div>
                </div>
            </div>

            <button type='submit' className='btn btn-primary px-4 mb-4 float-end'>Submit</button>
        </form>
        }
    </div>
  )
}

export default CategoryAddForm