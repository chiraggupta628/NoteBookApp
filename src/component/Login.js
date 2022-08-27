import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/login.css';
export const Login = () => {
    const host = "http://localhost:5000/";
    const navigate = useNavigate()
    const [credentials, setcredentials] = useState({ "email": "", "password": "" });
    const handleLogin = async (e) => {
        e.preventDefault();
        const loginURL = host + "api/v1/auth/login";
        const response = await fetch(loginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email": credentials.email, "password": credentials.password })
        });
        const json = await response.json();

        if (json.success) {
            //redirecting to
            localStorage.setItem('token', json.authToken);
            toast.success("Login Success. Redirecting....", { autoClose: 2000 });
            setTimeout(() => {
                navigate("/");
            }, 3000);

        }
        else {
            toast.error("Please Use Valid Credentials..", { autoClose: 3000 });
        }
        toast.clearWaitingQueue();

    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <>
            <ToastContainer limit={1} />
            <section className="vh-100" onSubmit={handleLogin}>
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <form>

                                <div className="form-outline mb-4">
                                    <input type="email" id="form1Example13" name="email" value={credentials.email} onChange={onChange} className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="form1Example13">Email address</label>
                                </div>


                                <div className="form-outline mb-4">
                                    <input type="password" id="form1Example23" name="password" value={credentials.password} onChange={onChange} className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="form1Example23">Password</label>
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                </div>

                                <Link to="/signup">
                                    <button className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#3b5998" }}>
                                        Register Here </button>
                                </Link>


                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
