import React from 'react';
import headerLogo from '../images/logotip.svg'

function Header({ children }) {
    return (
        <header className="header">
        <img className="header__logo" src={headerLogo} alt="Логотип Место"/>
        {children}
    </header>
    )
}

export default Header;