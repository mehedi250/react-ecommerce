import React from 'react'

function SkeletonCategoryCard() {
  return (
    <div className="card-container">
      <div className="card-wrap">
        <div className='card-head skeleton'>
          <i className="fas fa-code"></i>
        </div>
        <div className="card-content">
            <div className="skeleton skeleton-text skeleton-footer py-2 my-2"></div>
            <div className="skeleton skeleton-text w-75 my-3"></div>
            <div className="skeleton skeleton-button-pill mb-3 mt-2 w-75 mx-auto" style={{height: '28px'}}></div>
        </div>
      </div>  
    </div>
  )
}

export default SkeletonCategoryCard;