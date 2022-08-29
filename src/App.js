import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import Profile from './components/admin/Profile';
import Login from './components/auth/Login';
import Home from './components/frontend/Home';
import MasterLayout from './layouts/admin/MasterLayout';
function App(props) {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
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
