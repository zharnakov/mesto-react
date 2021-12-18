import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Cards from './Cards';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth'
import ProtectedRoute from './ProtectedRoute';


function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = (email) => {
        setLoggedIn(true)
        setEmail(email)
    }

    const handleTokenCheck = (path) => {
        if (localStorage.getItem('jwt')) {
            auth
                .checkToken(localStorage.getItem('jwt'))
                .then(res => {
                    if (res) {
                        setLoggedIn(true)
                        navigate(path)
                        setEmail(res.data.email)
                    }
                })
        }
    }
    useEffect(() => {
        handleTokenCheck('/')
    }, [])

    const handleLogout = (event) => {
        event.preventDefault()
        localStorage.removeItem('jwt')
        setLoggedIn(false)
        navigate('/sign-in')
      }

    return (
        <div className="page">
            <div className="page__container">
                <Routes>
                    <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
                    <Route path="/sign-up" element={<Register />} />
                    <Route exact path="/" element={<ProtectedRoute loggedIn={loggedIn}><Cards email={email} handleLogout={handleLogout} /></ProtectedRoute>} />
                </Routes>

            </div>
        </div>
    );
}

export default App;

