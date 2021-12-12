import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const[name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
          name,
          link,
        });
setName("");
setLink("");

      } 



    return (
        <PopupWithForm name={'addCard'} title={'Новое место'} buttonName={'Создать'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <div className="form__section">
                <input className="form__input" type="text" name="titleImage" value={name} onChange={handleChangeName} id="input-titleImage" placeholder="Название" required minLength="2" maxLength="30" />
                <span className="form__input-error input-titleImage-error"></span>
            </div>
            <div className="form__section">
                <input className="form__input" type="url" name="linkImage" value={link} id="input-linkImage" onChange={handleChangeLink} placeholder="Ссылка на картинку" required />
                <span className="form__input-error input-linkImage-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup
