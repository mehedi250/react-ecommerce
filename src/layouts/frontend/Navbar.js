import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        axios.post('/api/logout').then(res => {
            if (res.data.success) {
                localStorage.removeItem('__rea_token');
                localStorage.removeItem('__rea_auth_name');
                swal({ title: 'Success', text: res.data.message, icon: 'success', timer: 2000, buttons: false, });
                navigate('/');
            }
        });
    }

    const userName = (localStorage.getItem('__rea_auth_name')) ? localStorage.getItem('__rea_auth_name') : 'UNDEFIND'
    return (
        <nav className="navbar navbar-expand-lg bg-primary navbar-primary shadow sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/">Ecommerce</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/collections">Collection</Link>
                        </li>

                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                        {(!localStorage.getItem('__rea_token')) &&
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        }

                        {/* <li className="nav-item">
                        <button className="nav-link px-3 btn btn-logout" onClick={handleLogout}>Logout</button>
                    </li> */}
                        <li className={`nav-item dropdown ${(localStorage.getItem('__rea_token')) ? '' : 'd-none'}`}>
                            <Link className="nav-link" id="navbarDropdown" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <div className="header-avatar">{userName.slice(0, 2)}</div>
                                {/* {(localStorage.getItem('__rea_auth_name')) ? localStorage.getItem('__rea_auth_name'): 'UNDEFIND'} */}
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/admin/profile">Profile</Link></li>
                                <li><Link className="dropdown-item" to="#">Settings</Link></li>
                                <hr className="dropdown-divider" />
                                <li><Link className="dropdown-item" onClick={handleLogout} to="#">Logout</Link></li>
                            </ul>
                        </li>
                    </ul>
                    {/* <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form> */}
                </div>
            </div>

        </nav>
    )
}

export default Navbar