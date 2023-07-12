import React, { useState } from 'react';
import './RegisterForm.css'

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Username: " + username);
        console.log("Password: " + password);
        console.log("Name: " + name);
        console.log("Birthdate: " + birthdate);
    }

    return (
        <div className="register-container">
            <div className="register-form">
                <h1>Register</h1>
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
                    <div className="form-name">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name" />
                    </div>
                    <div className="form-birthdate">
                        <label htmlFor="birthdate">Birthdate</label>
                        <input
                            type="date"
                            name="birthdate"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            id="birthdate" />
                    </div>


                    <button className="form-button" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}