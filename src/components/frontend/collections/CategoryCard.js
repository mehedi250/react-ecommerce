import React from 'react'
import { Link } from 'react-router-dom';

function CategoryCard(props) {
    const item = props.item;
    const design = props.design;
  return (
    <div className="card-container">
        <div className="card-wrap">
            <div className={'card-head ' + design}>
            <i className="fas fa-code"></i>
            </div>
            <div className="card-content">
            <h1 className="card-title">{item.name}</h1>
            <p className="card-text">{item.description}</p>
            <Link to={`/collections/category/${item.slug}`} className={'card-btn '+ design}>View Product</Link>
            </div>
        </div>   
    </div>
  )
}

export default CategoryCard