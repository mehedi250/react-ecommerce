import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { categoryDropdoenApi, categoryInsertApi } from '../../../service/serviceApi';
import Switch from '../../elements/Switch';
import Select from 'react-select'

function ProductAdd(onClose) {
    const initialData = {
        category: null,
        meta_title: '',
        meta_keywords: '',
        meta_description: '',
        slug: '',
        name: '',
        brand: '',
        selling_price: '',
        original_price: '',
        description: '',
        quantity: '',
        error_list: []
    }

    const DEFAULT_CATEGORY = {label: 'Select Category', value: ''};
    const [productInput, setProductInput] = useState(initialData)
    const [status, setStatus] = useState(true);
    const [featured, setFeatured] = useState(false);
    const [popular, setPopular] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loader, setLoader] = useState(true);
    const [categoryList, setCategoryList] = useState([DEFAULT_CATEGORY]);
    const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
    const [picture, setPicture] = useState([]);

    useEffect(() => {
        getCategoryDropdown();
    }, []);

    const getCategoryDropdown = () =>{
        categoryDropdoenApi().then(res => {
            if(res.data.success){
                if(res.data.status === 'success'){
                    setLoader(false)
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
            setLoader(false)
        });
    }

    const handleImage = (e) =>{
        setPicture({image: e.target.files[0]})
    }

    const handleInput = (e) =>{
        e.persist();
        setProductInput({...productInput, [e.target.name]: e.target.value})
    }

    const handleStatus = () =>{
        setStatus(!status);
    }

    const handleFeatured = () =>{
        setFeatured(!featured);
    }

    const handlePopular = () =>{
        setPopular(!popular);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setIsLoading(true)
        setProductInput({...productInput, error_list: []})

        const formData = new FormData();
        formData.append('image', picture.image)
        formData.append('category', selectedCategory.value)
        formData.append('slug', productInput.slug);
        formData.append('name', productInput.name)
        formData.append('description', productInput.description);
        formData.append('meta_title', productInput.meta_title)
        formData.append('meta_keywords', productInput.meta_keywords)
        formData.append('meta_description', productInput.meta_description)
        formData.append('brand', productInput.brand)
        formData.append('selling_price', productInput.selling_price)
        formData.append('original_price', productInput.original_price)
        formData.append('quantity', productInput.quantity)
        formData.append('featured', featured)
        formData.append('status', status)
        formData.append('popular', popular)

        categoryInsertApi(formData).then(res => {
            if(res.data.success){
                if(res.data.status === 'success'){
                    swal('Success', res.data.message, 'success');
                    onClose('success')
                }
            }
            else{
                if(res.data.status === 'validation-error'){
                    setProductInput({...productInput, error_list: res.data.errors})
                }
                else{
                    swal('Error', res.data.message, 'error');
                }
            }
            setIsLoading(false)
        });
    }

  return (
    <div>
        
        {loader && 
        <div className="text-center">
            <div className="text-center">
                <div className="spinner-grow mx-auto" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>    
            </div>
        </div>
        }
        {!loader && 
        <form onSubmit={handleSubmit} id="category-form"  encType="multipart/form-data">
            {isLoading && 
            <div className="text-center">
                <div className="text-center">
                    <div className="spinner-grow mx-auto" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>    
                </div>
            </div>
            }
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="other-details-tab" data-bs-toggle="tab" data-bs-target="#other-details" type="button" role="tab" aria-controls="other-details" aria-selected="false">Other Details</button>
                </li>
        
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane  py-4 fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="form-group mb-3">
                        <label>Category</label>
                        <Select options={categoryList} onChange={setSelectedCategory} value={selectedCategory}/>
                        <span className='text-danger'>{productInput.error_list.category}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Slug</label>
                        <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className="form-control" />
                        <span className='text-danger'>{productInput.error_list.slug}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Name</label>
                        <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" />
                        <span className='text-danger'>{productInput.error_list.name}</span>
                    </div>

                    <div className="form-group mb-3">
                        <label>Description</label> 
                        <textarea name="description" onChange={handleInput} value={productInput.description} className="form-control"></textarea>
                        <span className='text-danger'>{productInput.error_list.description}</span>
                    </div>

                </div>

                <div className="tab-pane py-4 fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                    <div className="form-group mb-3">
                        <label>Meta Title</label>
                        <input type="text" name="meta_title" value={productInput.meta_title} onChange={handleInput} className="form-control" />
                        <span className='text-danger'>{productInput.error_list.meta_title}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Meta Keywords</label>
                        <textarea name="meta_keywords" value={productInput.meta_keywords} onChange={handleInput} className="form-control"></textarea>
                        <span className='text-danger'>{productInput.error_list.meta_keywords}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Meta Description</label>
                        <textarea name="meta_description" value={productInput.meta_description} onChange={handleInput} className="form-control" ></textarea>
                        <span className='text-danger'>{productInput.error_list.meta_description}</span>
                    </div>
                </div>

                <div className="tab-pane py-4 fade" id="other-details" role="tabpanel" aria-labelledby="seo-tags-tab">
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <div className="form-group mb-3">
                                <label>Selling Price</label>
                                <input type="text" name="selling_price" value={productInput.selling_price} onChange={handleInput} className="form-control" />
                                <span className='text-danger'>{productInput.error_list.selling_price}</span>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="form-group mb-3">
                                <label>Orginal Price</label>
                                <input type="text" name="original_price" value={productInput.original_price} onChange={handleInput} className="form-control" />
                                <span className='text-danger'>{productInput.error_list.original_price}</span>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="form-group mb-3">
                                <label>Quantity</label>
                                <input type="text" name="quantity" value={productInput.quantity} onChange={handleInput} className="form-control" />
                                <span className='text-danger'>{productInput.error_list.quantity}</span>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="form-group mb-3">
                                <label>Brand</label>
                                <input type="text" name="brand" value={productInput.brand} onChange={handleInput} className="form-control" />
                                <span className='text-danger'>{productInput.error_list.brand}</span>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="form-group mb-3">
                                <label>Image</label>
                                <input type="file" name="image" onChange={handleImage} accept="image/png, image/jpg, image/jpeg" className="form-control" />
                                <span className='text-danger'>{productInput.error_list.image}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <div className="form-group mb-3">
                                <label>Featured</label>
                                <Switch isOn={featured} handleToggle={handleFeatured} onColor='#32c832'/> 
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="form-group mb-3">
                                <label>Popular</label>
                                <Switch isOn={popular} handleToggle={handlePopular} onColor='#32c832'/> 
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="form-group mb-3">
                                <label>Status</label>
                                <Switch isOn={status} handleToggle={handleStatus} onColor='#32c832'/> 
                            </div>
                        </div>

                    </div>
                    
                    
                </div>
            </div>

            <button type='submit' className='btn btn-primary px-4 mb-4 float-end'>Submit</button>
        </form>
        }
    </div>
  )
}

export default ProductAdd