import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categoryActiveListApi } from '../../../service/serviceApi';
import useDelayCallback from '../../helpers/useDelayCallback';
import CategoryCard from '../skeleton/CategoryCard';


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
        <div className="col-md-4 col-lg-3 card-container pb-4" key={item.id}>
          <div className="card-wrap">
            <div className={'card-head ' + design}>
              <i className="fas fa-code"></i>
            </div>
            <div className="card-content">
              <h1 className="card-title">{item.name}</h1>
              <p className="card-text">{item.description}</p>
              <Link to={'/'} className={'card-btn '+ design}>View Product</Link>
            </div>
          </div>  
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
        <div className="col-md-4 col-lg-3 card-container pb-4" key={i}>
          <CategoryCard  />
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