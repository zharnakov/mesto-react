import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Cards from './Cards';
import Login from './Login';
import Register from './Register';


function App() {

    return (
            <div className="page">
                <div className="page__container">
                    <Header />
                    <Routes>
                        <Route path="/sign-in" element={<Login />} />
                        <Route path="/sign-up" element={<Register />} />
                        <Route exact path="/" element={<Cards />} />
                    </Routes> 

                </div>
            </div>
    );
}

export default App;

