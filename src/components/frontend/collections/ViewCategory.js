import React, { useState } from 'react';
import { categoryActiveListApi } from '../../../service/serviceApi';
import useDelayCallback from '../../helpers/useDelayCallback';
import SkeletonCategoryCard from '../skeleton/SkeletonCategoryCard';
import CategoryCard from './CategoryCard';



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

  const renderData = () =>{
    let view=[];
    let arr = ['one', 'two', 'three', 'four'];
    categoryList.map((item, index) =>{
      let design = arr[index%4];
      view.push(
        <div className="col-md-4 col-lg-3 pb-4" key={item.id}>
          <CategoryCard item={item} design={design} />
        </div>
      )
      return view;
    });
    if(view.length === 0){
          <div  className="text-center py-2">
            No data found!
          </div>;
    }else{
      return view;
    }
  }

  const skeletonLoader = () =>{
    let  skeletonLoaderList = [];

    for(let i=0; i<8; i++){
       skeletonLoaderList.push(
        <div className="col-md-4 col-lg-3 pb-4" key={i}>
          <SkeletonCategoryCard  />
        </div>
      );
    }
  
    return  skeletonLoaderList;
  }

  return(
    <div className="container py-4">
      <div className="row">
        {isLoading ? skeletonLoader() : renderData()}
        
      </div>
    </div>
   

  )
}

export default ViewCategory;