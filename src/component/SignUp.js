import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const SignUp = () => {
    const host = "http://localhost:5000/";
    const navigate = useNavigate()
    const [form, setForm] = useState({"name":"" ,"email": "", "password": "","cpassword":"","terms":false,"match":"true" });
    const handleSignUp = async (e) => {
        e.preventDefault();
        if(form.password == form.cpassword && form.terms==true){
            const loginURL = host + "api/v1/auth/createuser";
            const response = await fetch(loginURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "name":form.name,"email": form.email, "password": form.password })
            });
            const json = await response.json();
            
            if (json.success) {
                toast.success("Signup Successful. Please Login To Continue....",{ autoClose: 3000 });
                setTimeout(() => {
                    navigate("/login");
                }, 4000);
    
            }
            else {
                toast.error("User Already exist...", { autoClose: 3000 });
            }
            toast.clearWaitingQueue();
            
        }
        else{
            console.log(form);
        }
    
    }
    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const onChangePass = async (e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }
    const onChangeCBox = (e)=>{
        setForm({...form,[e.target.name]:e.target.checked})
    }
    useEffect(() => {
        if(form.password != form.cpassword){
            setForm({"name":form.name,"email":form.email,"password":form.password,"cpassword":form.cpassword,"terms":form.terms,"match":false});
        }
        else
        setForm({"name":form.name,"email":form.email,"password":form.password,"cpassword":form.cpassword,"terms":form.terms,"match":true});
    }, [form.cpassword | form.password]);
    
    return (
        <>
        <ToastContainer />
        <section className="vh-100" style={{backgroundColor: "#eee"}} onSubmit={handleSignUp}  >
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{borderRadius: "25px"}}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example1c" name="name" value={form.name} onChange={onChange} required className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="email" id="form3Example3c" name="email" value={form.email} onChange={onChange} required className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4c" name="password" value={form.password} onChange={onChangePass} minLength={5} required className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4cd" name="cpassword" value={form.cpassword} onChange={onChangePass} required minLength={5} className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                                                    <small id="machpass"  className={`form-text ${form.match?"d-none":""} text-danger`}>&nbsp;&nbsp;&nbsp;Password Don't match</small>
                                                </div>
                                            </div>

                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" defaultChecked={form.terms} name="terms" onChange={onChangeCBox} id="form2Example3c" />
                                                <label className="form-check-label" htmlFor="form2Example3">
                                                    I agree all statements in <a href="#!">Terms of service</a>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" disabled={!form.match || !form.terms} className="btn btn-primary btn-lg">Register</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample image" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
