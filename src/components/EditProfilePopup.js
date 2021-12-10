import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
   
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]); 

    function handleChangeName(e) {
        setName(e.target.value)
    }

    const [description, setDescription] = React.useState('');

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          name,
          about: description,
        });
      } 


    return (
        <PopupWithForm name={'editProfile'} title={"Редактировать профиль"} buttonName={"Сохранить"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <div className="form__section">
            <input className="form__input" type="text" name="name" value={name} id="input-name" placeholder="Имя" required minLength="2" maxLength="40" onChange={handleChangeName} />
            <span className="form__input-error input-name-error"></span>
        </div>
        <div className="form__section">
            <input className="form__input" type="text" name="occupation" value={description} id="input-occupation" placeholder="Род деятельности" required minLength="2" maxLength="200" onChange={handleChangeDescription} />
            <span className="form__input-error input-occupation-error"></span>
        </div>
    </PopupWithForm>
    )
}

export default EditProfilePopup
