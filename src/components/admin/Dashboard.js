import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { dashboardDataApi } from '../../service/serviceApi';
import useDelayCallback from '../helpers/useDelayCallback';

function Dashboard() {
  const initialData = {
    countCategory: null,
    countProduct: null,
    countUser: null
  }
  const [isLoading, setIsLoading] = useState(true);
  const [cardData, setCardData] = useState(initialData);

  useDelayCallback(() => {
    getDashboardData();
  }, []);

  const getDashboardData = () => {
    dashboardDataApi().then(res => {
      if (res.data.success) {
        if (res.data.status === 'success') {
          setIsLoading(false)
          setCardData(res.data.cardData);
        }
      }
    });
  }

  return (
    <>
      <h1>Dashboard</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Dashboard</li>
      </ol>

      {isLoading &&
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
      {!isLoading &&
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                {cardData.countProduct} Products
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link to="/admin/product" className="small text-white stretched-link" >View Details</Link>
                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
                {cardData.countUser} Users
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link to="/admin/product" className="small text-white stretched-link" >View Details</Link>
                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body">
                {cardData.countCategory} + Categories
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link to="/admin/Category" className="small text-white stretched-link" >View Details</Link>
                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
              </div>
            </div>
          </div>
        </div>
      }

    </>
  )
}

export default Dashboard