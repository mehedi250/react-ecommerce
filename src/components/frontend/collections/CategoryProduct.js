import React from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { categoryProductListApi } from '../../../service/serviceApi';
import useDelayCallback from '../../helpers/useDelayCallback';
import SkeletonCategoryProdutCard from '../skeleton/SkeletonCategoryProdutCard';

function CategoryProduct() {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [productList, seProductList] = useState([]);
    const [category, setCategory] = useState({});

    useDelayCallback(() => {
        getProductList();
    }, []);

    const getProductList = () => {
        categoryProductListApi({ slug: params.slug }).then(res => {
            if (res.data.success) {
                if (res.data.status === 'success') {

                    seProductList(res.data.data)
                    setCategory(res.data.category)
                }
            }
            else {
                seProductList([]);
            }
            setIsLoading(false)
        });
    }

    const renderProductList = () => {
        let html = [];
        html = productList.map((item, index) => {
            return (
                <div className="col-md-3" key={index}>
                    <div className="card">
                        <Link to={`/collections/product/${category.slug}/${item.slug}`}>
                            <img src={process.env.REACT_APP_BACKEND_ROOT_URL + item.image} className="w-100" alt={item.name} />
                        </Link>
                        <div className="card-body">
                            <Link to={`/collections/product/${category.slug}/${item.slug}`}>
                                <h5>{item.name}</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        })
        if(html.length){
            return html;
        }else{
            return (
                <div className="text-center py-3">
                    <h5>No Product Available for {category.name}!</h5>
                </div>
            )
        }
    }

    const renderProductListLoader = () => {
        let  skeletonLoaderList = [];

        for(let i=0; i<8; i++){
           skeletonLoaderList.push(
            <div className="col-md-4 col-lg-3 pb-4" key={i}>
              <SkeletonCategoryProdutCard  />
            </div>
          );
        }
      
        return  skeletonLoaderList;
    }


    return (
        <>
            <div className="bg-warning py-3">
                <div className="container">
                    Collection/{category.name}
                </div>
            </div>
            <div className="container py-3">
                {isLoading && 
                <div className="row">
                    {renderProductListLoader() }
                </div>
                }

                {!isLoading &&
                    <div className="row">
                        {renderProductList()}
                    </div>
                }
            </div>
        </>
    )
}

export default CategoryProduct