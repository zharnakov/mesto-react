import React, { useState } from "react";
import headerLogo from '../images/logotip.svg'
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth'
import InfoTooltip from './InfoTooltip'
import successIcon from '../images/successIcon.svg'
import failedAttempt from '../images/failedAttempt.svg'

function Register({loggedIn}) {
    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const [isOpenPopupforSuccessReg, setIsOpenPopupforSuccessReg ] = useState(false);
    
    function handleRegistrSuccess() {
        setIsOpenPopupforSuccessReg(true);
    }

    const [isOpenPopupforFailedReg, setIsOpenPopupforFailedReg ] = useState(false);
    
    function handleRegistrFailed() {
        setIsOpenPopupforFailedReg(true);
    }

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues(v => ({
            ...v,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (values.password && values.email) {
            auth
                .register(values.email, values.password)
                .then(res => {
                    if (res.data._id) {
                        openSuccessPopup();
                    } else {
                        openFailedPopup();
                    }
                })
        }
    }
function openSuccessPopup() {
    handleRegistrSuccess()
}

function closeSuccessPopups() {
    setIsOpenPopupforSuccessReg(false);
    navigate('/sign-in')
}


function openFailedPopup() {
    handleRegistrFailed()
}

function closeFailedPopups() {
    setIsOpenPopupforFailedReg(false);
}

    return (
        <>
            <header className="header">
                <img className="header__logo" src={headerLogo} alt="Логотип Место" />
                <Link className="header__link_sign-in" to='/sign-in'>Войти</Link>
            </header>
            <form className="register-form" onSubmit={handleSubmit}>
                <h3 className="register-form__title">Регистрация</h3>
                <input className="register-form__input" type="email" name="email" id="input-name" placeholder="Email" required minLength="2" maxLength="40" value={values.email} onChange={handleChange} />
                <input className="register-form__input" type="password" name="password" id="input-occupation" placeholder="Пароль" required minLength="5" maxLength="20" value={values.password} onChange={handleChange} />
                <button className="register-form__submit-button" type="submit">Зарегистрироваться</button>
                <div className="register-form__link"><p>Уже зарегистрированы?</p><Link className="register-form__caption" to='/sign-in'>&ensp;Войти</Link></div>
            </form>
            <InfoTooltip onClose={closeSuccessPopups} isOpen={isOpenPopupforSuccessReg} text="Вы успешно зарегистрировались!" imageSrc={successIcon} />
            <InfoTooltip onClose={closeFailedPopups} isOpen={isOpenPopupforFailedReg} text="Что-то пошло не так! Попробуйте ещё раз." imageSrc={failedAttempt} />

        </>
    )
}

export default Register

