import React, { SyntheticEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/authform.css'
// import { API_URL } from '../config';
// import { Navigate, useNavigate } from 'react-router-dom';

const Register = (props: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        credential: '',
        message: ''
    });
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
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-bg-dark"
                            placeholder="Enter username"
                            required
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control bg-dark text-bg-dark"
                            placeholder="Enter password"
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
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

// };

export default Register;