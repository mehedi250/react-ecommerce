
import React from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import Profile from './components/admin/Profile';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import Home from './components/frontend/Home';

import Master from './layouts/frontend/Master';
import AdminRoute from './protectedRoute/AdminRoute';
import Page404 from './layouts/error/Page404';
import Category from './components/admin/catagory/Category';
import Product from './components/admin/product/Product';
import ViewCategory from './components/frontend/collections/ViewCategory';
import CategoryProduct from './components/frontend/collections/CategoryProduct';
import CategoryProductDetail from './components/frontend/collections/CategoryProductDetail';
import Cart from './components/frontend/product/Cart';


axios.defaults.baseURL = process.env.REACT_APP_BACKEND_ROOT_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('__rea_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
}) 

function App(props) {
  
  return (
    <div className="App" style={{minHeight: '100vh'}}>
      <Router>
        <Routes>

          <Route path='/' element={<Master/> } >
            <Route path='' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/collections' element={<ViewCategory />} />
            <Route path='/collections/category/:slug' element={<CategoryProduct />} />
            <Route path='/collections/product/:category/:slug' element={<CategoryProductDetail />} />
            <Route path='/cart' element={(localStorage.getItem('__rea_token'))?<Cart/>:<Navigate replace to="/login" />} />

          </Route>

          {/* <Route path='/admin/' element={(localStorage.getItem('__rea_token'))?<AdminRoute/>:<Navigate replace to="/login" />} > */}
          <Route path='/admin/' element={<AdminRoute/>} >
            <Route path='' element={<Navigate replace to="/admin/dashboard" />}  />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='profile' element={<Profile />} />
            <Route path='category' element={<Category />} />
            <Route path='product' element={<Product />} />

          </Route>
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
