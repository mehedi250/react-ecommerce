import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { categoryProductListApi } from '../../../service/serviceApi';
import useDelayCallback from '../../helpers/useDelayCallback';

function CategoryProduct() {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [ProductList, seProductList] = useState([]);
    const [name, seName] = useState('');

    useDelayCallback(() => {
        getProductList();
    }, []);

    const getProductList = () =>{
        categoryProductListApi({slug: params.slug}).then(res => {
            if(res.data.success){
                if(res.data.status === 'success'){
                   
                    seProductList(res.data.data)
                    seName(res.data.name)
                }
            }
            else{
                seProductList([]);
            }
            setIsLoading(false)
        });
    }
  return (
    <>
        <div className="container py-4">
            {isLoading && <div>Loading...</div>}
            {!isLoading &&
            <>
            <h3>{name}</h3>
            <hr />
            </>
            }
            
              
        </div>
        
       
    </>
    
  )
}

export default CategoryProduct