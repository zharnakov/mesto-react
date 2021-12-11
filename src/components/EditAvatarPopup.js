import React, { useRef } from "react"
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const inputRef = useRef();

    function handleSubmit(e) {
  e.preventDefault();

  onUpdateAvatar({
    avatar: inputRef.current.value
  });
} 



    return (
        <PopupWithForm name={'updateAvatar'} title={'Обновить аватар'} buttonName={'Сохранить'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <div className="form__section">
                <input className="form__input" ref={inputRef} type="url" name="avatarLink" id="input-avatarLink" placeholder="Ссылка на картинку" required />
                <span className="form__input-error input-avatarLink-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;