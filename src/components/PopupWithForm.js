import React from "react";

function PopupWithForm({name, title, buttonName, children, isOpen, onClose}) {
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`} id={name}>
                    <div className="popup__container">
                        <form className="form" name={name}>
                            <h3 className="form__title">{title}</h3>
                            {children}
                            <button className="form__submit-button" type="submit">{buttonName}</button>
                        </form>
                        <button className="popup__container-close" id="close_popup_btn" aria-label="закрывающий крестик" type="button" onClick={onClose}></button>
                    </div>
                </div>
    )
}

export default PopupWithForm;

