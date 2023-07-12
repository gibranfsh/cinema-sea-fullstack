import React, { useState } from 'react';
import './LoginForm.css'
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Username: " + username);
        console.log("Password: " + password);

        // clear form
        // setUsername("");
        // setPassword("");
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-username">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id="username" />
                    </div>
                    <div className="form-password">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password" />
                    </div>
                    <div className="gs-text">
                        <p>Don't have an account?{' '}
                            <span className="get-started-link" onClick={() => navigate('/register')}>
                                Get Started
                            </span>
                        </p>
                    </div>

                    <button className="form-button" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}