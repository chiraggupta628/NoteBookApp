import React from 'react'
import {
    BrowserRouter as Router,
    Link,
    useNavigate
  } from "react-router-dom";
  import { ToastContainer, toast } from 'react-toastify';
export default function NavBar() {
    const navigate = useNavigate();
    const handleLogOut = ()=>{
        toast.success("Log Out Success Fully",{ autoClose: 1000 })
        localStorage.removeItem('token');
        navigate("/login");
    }
    return (
        <>
        <ToastContainer />
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link  to="/">
                        <img
                            src="https://thumbs.dreamstime.com/z/notebook-icon-vector-sign-symbol-isolated-white-backgroun-background-your-web-mobile-app-design-logo-concept-133746850.jpg"
                            height="30"
                            width="30"
                            loading="lazy"
                            alt="Image"
                            style={{marginTop: "-1px"}}
                        />
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarButtonsExample"
                        aria-controls="navbarButtonsExample"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarButtonsExample">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/mynotes">My Notes</Link>
                            </li>
                        </ul>

                        {!localStorage.getItem('token')?<div className="d-flex align-items-center">
                        <Link to="/login">
                            <button type="button" className="btn btn-primary px-3 me-2">
                               Login
                            </button></Link> 
                            <Link to="/signup">
                            <button type="button" className="btn btn-primary px-3 me-3">
                            Sign up  
                            </button></Link>
                        </div>:<div className="d-flex align-items-center">
                            <button type="button" className="btn btn-primary px-3 me-2" onClick={handleLogOut}>
                               Log Out
                            </button></div> }
                    </div>

                </div>

            </nav>


        </>
    )
}
