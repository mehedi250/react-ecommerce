import React from 'react'

function SkeletonCategoryProdutCard() {
  return (
    <div className="card">
        <div className='card-head skeleton' style={{aspectRatio: "1/1"}}> 

        </div>
        <div className="card-body">
            <div className="skeleton skeleton-text skeleton-footer py-2 my-2"></div>
        </div>
    </div>
  )
}

export default SkeletonCategoryProdutCard