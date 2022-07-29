import React from 'react'
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
export default function NavBar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand me-2" href="/">
                        <img
                            src="https://thumbs.dreamstime.com/z/notebook-icon-vector-sign-symbol-isolated-white-backgroun-background-your-web-mobile-app-design-logo-concept-133746850.jpg"
                            height="30"
                            width="30"
                            loading="lazy"
                            alt="Image"
                            style={{marginTop: "-1px"}}
                        />
                    </a>

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
                        </ul>

                        <div className="d-flex align-items-center">
                            <button type="button" className="btn btn-link px-3 me-2">
                                Login
                            </button>
                            <button type="button" className="btn btn-primary me-3">
                                Sign up for free
                            </button>
                        </div>
                    </div>

                </div>

            </nav>


        </>
    )
}
