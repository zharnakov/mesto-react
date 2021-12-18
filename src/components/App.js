import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
// import Header from './Header';
import Cards from './Cards';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth'
import ProtectedRoute from './ProtectedRoute';


function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        setLoggedIn(true)
    }
    const handleTokenCheck = (path) => {
        if (localStorage.getItem('jwt')) {
            auth
                .checkToken(localStorage.getItem('jwt'))
                .then(res => {
                    if (res) {
                        setLoggedIn(true)
                        navigate(path)
                    }
                })
        }
    }
    useEffect(() => {
        handleTokenCheck('/')
    }, [])

    return (
        <div className="page">
            <div className="page__container">
                {/* <Header /> */}
                <Routes>
                    <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
                    <Route path="/sign-up" element={<Register />} />
                    <Route exact path="/" element={<ProtectedRoute loggedIn={loggedIn}><Cards /></ProtectedRoute>} />
                </Routes>

            </div>
        </div>
    );
}

export default App;

