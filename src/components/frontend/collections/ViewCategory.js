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

  const renderData = () =>{
    let view=[];
    categoryList.map((item) =>{

      view.push(
        <div className="col-md-4 col-lg-3 card-container" key={item.id}>
          <div className="card-wrap">
            <div className="card-head one">
              <i className="fas fa-code"></i>
            </div>
            <div className="card-content">
              <h1 className="card-title">{item.name}</h1>
              <p className="card-text">{item.description}</p>
              <button className="card-btn one">code</button>
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

  return(
    <div className="container py-4">
      <div className="row">
        {!isLoading && renderData()}
        
      </div>
    </div>
   

  )
}

export default ViewCategory;