import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from "./Header";

import * as auth from '../utils/auth'

function Login({ onLogin }) {
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues(v => ({
            ...v,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!values.email || !values.password) {
            return
        }

        auth
            .authorize(values.email, values.password)
            .then(res => {
                if (res.token) {
                    setValues({
                        email: '',
                        password: '',
                    })

                    localStorage.setItem('jwt', res.token)
                    onLogin(values.email)
                    navigate('/')
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <Header>
            <Link className="header__link_sign-in" to='/sign-up'>Регистрация</Link>
            </ Header>
            <form className="register-form" onSubmit={handleSubmit}>
                <h3 className="register-form__title">Вход</h3>
                <input className="register-form__input" type="email" name="email" id="input-name" placeholder="Email" required minLength="2" maxLength="40" value={values.email} onChange={handleChange} />
                <input className="register-form__input" type="password" name="password" id="input-occupation" placeholder="Пароль" required minLength="5" maxLength="20" value={values.password} onChange={handleChange} />
                <button className="register-form__submit-button" type="submit">Войти</button>
            </form>
        </>
    )
}

export default Login
