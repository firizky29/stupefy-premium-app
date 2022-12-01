import React, { SyntheticEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/authform.css'
// import { API_URL } from '../config';
// import { Navigate, useNavigate } from 'react-router-dom';

const Register = (props: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({
        credential: '',
        message: ''
    });
    const [state, setState] = useState({
        validName: true,
        validUsername: true,
        validEmail: true,
        validPassword: true,
        validConfirmPassword: true,
    })
    // const navigate = useNavigate();


    const submit = async (e: SyntheticEvent) => {
        // e.preventDefault();
        // const res = await fetch(`${API_URL}/auth/login`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     credentials: 'include',
        //     body: JSON.stringify({
        //         username,
        //         password
        //     })
        // });
        // if (res.status === 200) {
        //     const data = await res.json();
        //     props.setIsLoggedIn(true);
        //     navigate('/');
        // } else {
        //     const data = await res.json();
        //     setErrors({ ...errors, ...data });
        // }
    }
    
    return (
        <div className="h-100 auth-wrapper pd-10 d-flex justify-content-center align-items-center">
            <div className="auth-inner bg-dark text-bg-dark mb-4 mt-3 card py-3 px-3">
                <form onSubmit={submit}>
                    <h3>Sign Up to Stupefy Premium App</h3>
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-bg-dark"
                            placeholder="Enter your name"
                            required
                            onChange={e => {
                                setState({...state, validName: checkName(e.target.value)});
                                setName(e.target.value);
                            }}
                        />
                        {
                            (!state.validName) 
                        ?
                            <label className="text-danger">Nama tidak boleh kosong</label>
                        :
                            <></>
                        }
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-bg-dark"
                            placeholder="Enter your email"
                            required
                            onChange={e => {
                                setState({...state, validEmail: checkEmail(e.target.value)});
                                setEmail(e.target.value);
                            }}
                        />
                        {
                            (!state.validEmail) 
                        ?
                            <label className="text-danger">Email tidak valid</label>
                        :
                            <></>
                        }
                    </div>
                    <div className="mb-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-bg-dark"
                            placeholder="Enter username"
                            required
                            onChange={e => {
                                setState({...state, validUsername: checkUsername(e.target.value)});
                                setUsername(e.target.value);
                            }}
                        />
                        {
                            (!state.validUsername) 
                        ?
                            <label className="text-danger">Username tidak valid</label>
                        :
                            <></>
                        }
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control bg-dark text-bg-dark"
                            placeholder="Enter password"
                            required
                            onChange={e => {
                                setState({...state, validPassword: checkPassword(e.target.value)});
                                setPassword(e.target.value);
                            }}
                        />
                        {
                            (!state.validPassword) 
                        ?
                            <label className="text-danger">Password tidak boleh kosong</label>
                        :
                            <></>
                        }
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control bg-dark text-bg-dark"
                            placeholder="Enter password"
                            required
                            onChange={e => setState({...state, validConfirmPassword: checkConfrimPassword(password, e.target.value)})}
                        />
                        {
                            (!state.validConfirmPassword) 
                        ?
                            <label className="text-danger">Password tidak sesuai</label>
                        :
                            <></>
                        }
                    </div>
                    <div className="text-danger mb-3">{errors.credential}</div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-success" onClick={submit}>
                            Sign up
                        </button>
                    </div>
                </form>
                <div className="text-center">Already have an account? <NavLink to="/login">Sign in</NavLink></div>
            </div>
        </div>
    );
}

function checkName(name : string) : boolean {
    return name.length > 0;
}

function checkUsername(username : string) : boolean {
    const regex : RegExp = /^[a-zA-Z0-9_]+$/;
    return regex.test(username);
}
function checkEmail(email : string) : boolean {
    const regex : RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(regex.test(email)){

        return true;
    }else{
        return false;
    }
}

function checkPassword(password : string) : boolean {
    return password.length>0;
}

function checkConfrimPassword(password : string, confirmPassword : string) : boolean {
    return password === confirmPassword;
}

export default Register;