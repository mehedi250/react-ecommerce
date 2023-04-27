import React, { useState } from 'react'
import { productDataApi } from '../../../service/serviceApi';
import { useParams } from 'react-router-dom';
import useDelayCallback from '../../helpers/useDelayCallback';

function ProductDetail() {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [product, seProduct] = useState(null);

    useDelayCallback(() => {
        getProductDetail();
    }, []);

    const getProductDetail = () => {
        productDataApi({ slug: params.slug }).then(res => {

            if (res.data.status === 'success') {
                seProduct(res.data.data)
            }
            else {
                seProduct(null);
            }
            setIsLoading(false)
        });
    }

    return (
        <div className="container py-3">
            {!isLoading &&
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
                                        <button className="input-group-text">-</button>
                                        <input type="number" className="form-control shadow-none text-center" min={1}/>
                                        <button className="input-group-text">+</button>
                                    </div>
                                </div>

                                <div className="col-md-3 mt-3">
                                    <button className="btn btn-primary w-100">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                        }
                        
                        <div className="col-md-3 mt-3">
                            <button className="btn btn-danger">Add to Wishlist</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductDetail