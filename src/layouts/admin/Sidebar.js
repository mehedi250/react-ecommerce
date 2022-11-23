import React from 'react'
import { Link } from 'react-router-dom'
function Sidebar() {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <Link className="nav-link" to='/admin/dashboard'>
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link>
                    <Link className="nav-link" to='/admin/category'>
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Category
                    </Link>
                    <Link className="nav-link" to='/admin/product'>
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Products
                    </Link>
                    <div className="sb-sidenav-menu-heading">Interface</div>
                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Layouts
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="layout-static.html">Static Navigation</Link>
                            <Link className="nav-link" to="layout-sidenav-light.html">Light Sidenav</Link>
                        </nav>
                    </div>
                 
                    
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                ADMIN
            </div>
        </nav>
    )
}

export default Sidebar