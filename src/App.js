
import React from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import Profile from './components/admin/Profile';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import Home from './components/frontend/Home';
import MasterLayout from './layouts/admin/MasterLayout';
import Master from './layouts/frontend/Master';

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

function App(props) {
  return (
    <div className="App" style={{minHeight: '100vh'}}>
      <Router>
        <Routes>

          <Route path='/' element={<Master/> } >
            <Route path='' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>

          <Route path='/admin/' element={<MasterLayout/> } >
            <Route path='' element={<Navigate replace to="/admin/dashboard" />}  />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          {/* <Route path='*' element={<Home />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
