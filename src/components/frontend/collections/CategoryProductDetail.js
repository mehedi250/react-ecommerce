import React, { useState } from 'react'
import ProductDetail from '../product/ProductDetail';
import { productDataApi } from '../../../service/serviceApi';
import { useParams } from 'react-router-dom';
import useDelayCallback from '../../helpers/useDelayCallback';

const CategoryProductDetail = () => {
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
            <ProductDetail product={product} />
            }
        </div>
    )
}

export default CategoryProductDetail