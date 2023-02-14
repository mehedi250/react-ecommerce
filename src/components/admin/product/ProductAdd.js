import React, { useState } from 'react'
import swal from 'sweetalert';
import { productDetailsApi, productSaveApi, productUpdateApi } from '../../../service/serviceApi';
import Switch from '../../elements/Switch';
import Select from 'react-select'
import useDelayCallback from '../../helpers/useDelayCallback';

function ProductAdd(props) {
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
        status: true,
        featured: false,
        popular: false,
        oldImage: null,
        error_list: []
    }

    const DEFAULT_CATEGORY = {label: 'Select Category', value: ''};
    const [productInput, setProductInput] = useState(initialData)
    const [isLoading, setIsLoading] = useState(false);
    const [loader, setLoader] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
    const [picture, setPicture] = useState([]);

    useDelayCallback(() => {
        if(props.productId !== 0){
            loadData();
        }else{
            setLoader(false)
        }
    }, []);

    const loadData = () =>{
        productDetailsApi({id: props.productId}).then(res => {
            if(res.data.success){
                if(res.data.status === 'success'){
                    const tempData = {
                        meta_title: res.data.data.meta_title,
                        meta_keywords: res.data.data.meta_keyword,
                        meta_description: res.data.data.meta_description,
                        slug: res.data.data.slug,
                        name: res.data.data.name,
                        brand: res.data.data.brand,
                        selling_price: res.data.data.selling_price,
                        original_price: res.data.data.original_price,
                        description: res.data.data.description,
                        quantity: res.data.data.quantity,
                        status: res.data.data.status===1,
                        featured: res.data.data.featured===1,
                        popular: res.data.data.popular===1,
                        oldImage: res.data.data.image
                    }
                    setProductInput({...productInput, ...tempData})
                    let i=0;
                    while(i < props.categoryList.length){
                        if(props.categoryList[i].value === res.data.data.category_id){
                            setSelectedCategory(props.categoryList[i])
                        }
                        i++;
                    }

                }    
            }
            setLoader(false)
        })
        .catch(error => {
            console.log('something is wrong' + error)
        });
    }

    const handleImage = (e) =>{
        setPicture({image: e.target.files[0]})
    }

    const handleInput = (e) =>{
        e.persist();
        setProductInput({...productInput, [e.target.name]: e.target.value})
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
        setProductInput({...productInput, ...tempData})
    }

    const handleUpdate = (formData) =>{
        productUpdateApi(props.productId, formData).then(res => {
            if(res.data.success){
                if(res.data.status === 'success'){
                    swal({title: 'Success', text: res.data.message, icon: 'success', timer: 2000, buttons: false,}) 
                    props.onClose('success')
                }
            }
            else{
                if(res.data.status === 'validation-error'){
                    setProductInput({...productInput, error_list: res.data.errors})
                }
                else{
                    swal({title: 'Error', text: res.data.message, icon: 'error', timer: 2000, buttons: false, })
                }
            }
            setIsLoading(false)
        });
    }

    const handleCreate = (formData) =>{
        productSaveApi(formData).then(res => {
            if(res.data.success){
                if(res.data.status === 'success'){
                    swal({title: 'Success', text: res.data.message, icon: 'success', timer: 2000, buttons: false,}) ;
                    props.onClose('success')
                }
            }
            else{
                if(res.data.status === 'validation-error'){
                    setProductInput({...productInput, error_list: res.data.errors})
                }
                else{
                    swal({title: 'Error', text: res.data.message, icon: 'error', timer: 2000, buttons: false, });
                }
            }
            setIsLoading(false)
        });
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
        formData.append('meta_keyword', productInput.meta_keywords)
        formData.append('meta_description', productInput.meta_description)
        formData.append('brand', productInput.brand)
        formData.append('selling_price', productInput.selling_price)
        formData.append('original_price', productInput.original_price)
        formData.append('quantity', productInput.quantity)
        formData.append('featured', productInput.featured===true?1:0)
        formData.append('status', productInput.status===true?1:0)
        formData.append('popular', productInput.popular===true?1:0)

        if(props.productId !== 0){
            handleUpdate(formData);
        }else{
            handleCreate(formData);
        }
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
                        <Select options={props.categoryList} onChange={setSelectedCategory} value={selectedCategory}/>
                        <span className='text-danger'>{productInput.error_list.category}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Name</label>
                        <input type="text" name="name" onChange={handleName} value={productInput.name} className="form-control" />
                        <span className='text-danger'>{productInput.error_list.name}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Slug</label>
                        <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className="form-control" />
                        <span className='text-danger'>{productInput.error_list.slug}</span>
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
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label>Brand</label>
                                <input type="text" name="brand" value={productInput.brand} onChange={handleInput} className="form-control" />
                                <span className='text-danger'>{productInput.error_list.brand}</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            
                            <div className="form-group mb-3">
                                <label>Image</label>
                                <input type="file" name="image" onChange={handleImage} accept="image/png, image/jpg, image/jpeg" className="form-control" />
                                <span className='text-danger'>{productInput.error_list.image}</span>
                            </div>
                            {(productInput.oldImage != null && picture.length === 0) &&
                                <div>
                                    <img style={{maxWidth: "40px"}} src={`${process.env.REACT_APP_BACKEND_ROOT_URL}${productInput.oldImage}`} alt="" />
                                </div>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <div className="form-group mb-3">
                                <label>Featured</label>
                                <Switch isOn={productInput.featured} handleToggle={()=>setProductInput({...productInput, featured: !productInput.featured})} index="1" /> 
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="form-group mb-3">
                                <label>Popular</label>
                                <Switch isOn={productInput.popular} handleToggle={ ()=>setProductInput({...productInput, popular: !productInput.popular})} index="2" /> 
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="form-group mb-3">
                                <label>Status</label>
                                <Switch isOn={productInput.status} handleToggle={ ()=>setProductInput({...productInput, status: !productInput.status})} index="3" /> 
                            </div>
                        </div>

                    </div>
                    
                    
                </div>
            </div>

            <button type='submit' className='btn btn-primary px-4 mb-4 float-end'>{props.productId !== 0?'Update':'Submit'}</button>
        </form>
        }
    </div>
  )
}

export default ProductAdd