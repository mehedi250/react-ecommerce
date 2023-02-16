import React, { useState } from 'react';
import { categoryActiveListApi } from '../../../service/serviceApi';
import useDelayCallback from '../../helpers/useDelayCallback';


function ViewCategory(){
    const [isLoading, setIsLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);

    useDelayCallback(() => {
        getCategoryList();
    }, []);

    const getCategoryList = () =>{
        categoryActiveListApi().then(res => {
          if(res.data.success){
            if(res.data.status === 'success'){
              setIsLoading(false)
              setCategoryList(res.data.data)
            }
          }
          else{
            setCategoryList([]);
          }
          
        });
    }

}

export default ViewCategory;