import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useDelayCallback from '../../helpers/useDelayCallback';


function ProductDisplay(props){
  const [isLoading, setIsLoading] = useState(true);

  useDelayCallback(() => {
    renderData();
  }, []);


  const renderData = () =>{
    let view=[];
    let arr = ['one', 'two', 'three', 'four'];
    props.products.map((item, index) =>{
      view.push(
        <div className="col-md-4 col-lg-3 card-container" key={item.id}>
          <div className="card-wrap">

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
      <hr />
      <h3>Name</h3>
      <hr />
      
      <div className="row">
        {!isLoading && renderData()}
        
      </div>
    </div>
  )
}

export default ProductDisplay;
