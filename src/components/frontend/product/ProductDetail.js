import React, { useState } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import { addTochartApi } from '../../../service/serviceApi';

function ProductDetail(props) {
    const [product, seProduct] = useState(props.product);
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () =>{
        if(quantity>1){
            setQuantity(quantity - 1);
        }
    }
    const handleIncrement = () =>{
        if(quantity<product.quantity){
            setQuantity(quantity + 1);
        }
    }

    const submitAddtocart = (e) =>{
        // console.log('clicked');
        const data = {
            product_id: product.id,
            product_quantity: quantity
        }

        addTochartApi(data).then(res => {
            if(res.data.success){
                if(res.data.status === 'success'){
                    swal({title: 'Success', text: res.data.message, icon: 'success', timer: 2000, buttons: false,}) ;
                }
            }
            else{
                if(res.data.status === 'validation-error'){
                    // setProductInput({...productInput, error_list: res.data.errors})
                }
                else{
                    swal({title: 'Error', text: res.data.message, icon: 'error', timer: 2000, buttons: false, });
                }
            }
        }).catch(function (error) {
            if(error.response.status === 401 || error.response.status === 403){
                swal({title: 'Unauthorized', text: 'Please login as user', icon: 'error', timer: 2000, buttons: false, });
            }
        });
     
    }
  

    return (
        <div className="row">
            <div className="col-md-4 border-end py-1">
                <img src={process.env.REACT_APP_BACKEND_ROOT_URL + product.image} alt="" className="w-100" />
            </div>
            <div className="col-md-8 px-4 py-1">
                <h4>{product.name}
                    <span className="float-end badge btn-sm btn-danger badge-pil">{product.brand}</span>
                </h4>
                <p>{product.description}</p>
                <h4>
                    TK: {product.selling_price}
                    <s className="ms-2">TK: {product.original_price}</s>
                </h4>

                {parseInt(product.quantity) < 1 &&
                <div><label className="btn-sm btn-danger px-4 mt-2">Out of Stock</label></div>
                }
                {parseInt(product.quantity) >= 1 &&
                <div>
                    <label className="btn-sm btn-success px-4 mt-2">In Stock</label>
                    <div className="row">
                        <div className="col-md-3 mt-3">
                            <div className="input-group">
                                <button className="input-group-text" onClick={handleDecrement}>-</button>
                                <input type="number" className="form-control shadow-none text-center" value={quantity} min={1}/>
                                <button className="input-group-text" onClick={handleIncrement}>+</button>
                            </div>
                        </div>

                        <div className="col-md-3 mt-3">
                            <button className="btn btn-primary w-100" onClick={submitAddtocart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
                }
                
                <div className="col-md-3 mt-3">
                    <button className="btn btn-danger">Add to Wishlist</button>
                </div>
            </div>
        </div>

    )
}

export default ProductDetail