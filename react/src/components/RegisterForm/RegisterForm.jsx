import React, { useState } from 'react';
import './RegisterForm.css'
import axiosClient from '../../axios-client';
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const { setUser, setToken, token } = useStateContext();

    if (token) {
        return <Navigate to="/" />;
    }

    const birthdateToAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username) {
            toast.error("Username must be filled", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        if (!password) {
            toast.error("Password must be filled", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        if (!name) {
            toast.error("Name must be filled", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        // if age < 7, toast error
        if (birthdateToAge(birthdate) < 7) {
            toast.error("Age must be greater than 7 years old", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        if (!birthdate) {
            toast.error("Birthdate must be filled", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        const payload = {
            username: username,
            password: password,
            name: name,
            age: birthdateToAge(birthdate),
            balance: 0
        }

        axiosClient.post('/register', payload)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    Object.keys(response.data.errors).forEach(key => {
                        toast.error(response.data.errors[key][0], {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    });
                }
            })
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
                        <label htmlFor="birthdate">Birthdate (will be converted to age)</label>
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
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    )
}