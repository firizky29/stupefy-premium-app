import React, { SyntheticEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../assets/css/authform.css'
import '../assets/css/form.css';
import { API_URL } from '../config';
// import { API_URL } from '../config';
// import { Navigate, useNavigate } from 'react-router-dom';

const Register = (props: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    function checkName(name : string) {
        if(name.length === 0){
            setErrors({
                ...errors,
                name: 'Name is required'
            });            
        } else{
            setErrors({
                ...errors,
                name: ''
            });
        }
    }
    
    
    function checkUsername(username : string) {
        const regex : RegExp = /^[a-zA-Z0-9_]+$/;
        if(username.length < 6){
            setErrors({
                ...errors,
                username: 'Username must be at least 6 characters long'
            });
        } else if(!regex.test(username)){
            setErrors({
                ...errors,
                username: 'Username must contain only letters, numbers and underscores'
            });
        } else{
            setErrors({
                ...errors,
                username: ''
            });
        }
    }
    function checkEmail(email : string) {
        const regex : RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(regex.test(email)){
            setErrors({
                ...errors,
                email: ''
            });
        }else{
            setErrors({
                ...errors,
                email: 'Email is not valid'
            });
        }
    }
    
    function checkPassword(password : string) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        if(password.length < 8){
            setErrors({
                ...errors,
                password: 'Password must be at least 8 characters long'
            });
        } else if(!regex.test(password)){
            setErrors({
                ...errors,
                password: 'Password must contain at least one letter, one number and one special character'
            });
        }
        else{
            setErrors({
                ...errors,
                password: ''
            });
        }
    }
    
    function checkConfirmPassword(password : string, confirmPassword : string){
        if(password !== confirmPassword){
            setErrors({
                ...errors,
                confirmPassword: 'Passwords do not match'
            });
        } else{
            setErrors({
                ...errors,
                confirmPassword: ''
            });
        }
    }
    


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/auth/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name,
                username,
                password,
                email
            })
        });
        if (res.status === 200) {
            const data = await res.json();

            props.setAlert({ type: 'success', message: data.message });
            props.setShowAlert(true);
            props.setIsLoggedIn(true);
            navigate('/');
        } else if(res.status === 500){
            const data = await res.json();
            props.setAlert({
                type: 'Error',
                message: data.message
            });
            props.setShowAlert(true);
        } else {
            const data = await res.json();
            setErrors({ ...errors, ...data });
        }
    }
    
    if(props.isLoggedIn){
        navigate('/');
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
                                checkName(e.target.value);
                                setName(e.target.value);
                            }}
                        />
                        <div className="text-danger">{errors.name}</div>
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-bg-dark"
                            placeholder="Enter your email"
                            required
                            onChange={e => {
                                checkEmail(e.target.value);
                                setEmail(e.target.value);
                            }}
                        />
                        <div className="text-danger">{errors.email}</div>
                    </div>
                    <div className="mb-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-bg-dark"
                            placeholder="Enter your username"
                            required
                            onChange={e => {
                                checkUsername(e.target.value);
                                setUsername(e.target.value);
                            }}
                        />
                        <div className="text-danger">{errors.username}</div>
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control bg-dark text-bg-dark"
                            placeholder="Enter password"
                            required
                            onChange={e => {
                                checkPassword(e.target.value);
                                setPassword(e.target.value);
                            }}
                        />
                        <div className="text-danger">{errors.password}</div>
                    </div>
                    <div className="mb-3">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control bg-dark text-bg-dark"
                            placeholder="Confirm your password"
                            required
                            onChange={e => {
                                checkConfirmPassword(password, e.target.value);
                            }}
                        />
                        <div className="text-danger">{errors.confirmPassword}</div>
                    </div>
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


export default Register;