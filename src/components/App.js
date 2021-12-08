import React, { useState, useEffect } from 'react';
import headerLogo from '../images/logotip.svg'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {

    const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '' });

    useEffect(() => {
        api.getUserInfo()
            .then((objectInfo) => {
                setCurrentUser({ name: objectInfo.name, about: objectInfo.about, avatar: objectInfo.avatar })
            })
            .catch((err) => alert(err));
    }, [])



    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    //    функция handleDeleteCardClick никому не присвоена
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);

    function handleDeleteCardClick() {
        setIsDeleteCardPopupOpen(true);
    }

    const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });

    function handleCardClick(cardElement) {
        setSelectedCard(cardElement);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsDeleteCardPopupOpen(false);
        setSelectedCard({ name: '', link: '' });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Header />
                    <Main handleEditProfileClick={handleEditProfileClick} handleAddPlaceClick={handleAddPlaceClick} handleEditAvatarClick={handleEditAvatarClick} handleDeleteCardClick={handleDeleteCardClick} onCardClick={handleCardClick} />
                    <Footer />
                    <PopupWithForm name={'editProfile'} title={"Редактировать профиль"} buttonName={"Сохранить"} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                        <div className="form__section">
                            <input className="form__input" type="text" name="name" id="input-name" placeholder="Имя" required minLength="2" maxLength="40" />
                            <span className="form__input-error input-name-error"></span>
                        </div>
                        <div className="form__section">
                            <input className="form__input" type="text" name="occupation" id="input-occupation" placeholder="Род деятельности" required minLength="2" maxLength="200" />
                            <span className="form__input-error input-occupation-error"></span>
                        </div>
                    </PopupWithForm>

                    <PopupWithForm name={'addCard'} title={'Новое место'} buttonName={'Создать'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                        <div className="form__section">
                            <input className="form__input" type="text" name="titleImage" id="input-titleImage" placeholder="Название" required minLength="2" maxLength="30" />
                            <span className="form__input-error input-titleImage-error"></span>
                        </div>
                        <div className="form__section">
                            <input className="form__input" type="url" name="linkImage" id="input-linkImage" placeholder="Ссылка на картинку" required />
                            <span className="form__input-error input-linkImage-error"></span>
                        </div>
                    </PopupWithForm>

                    <PopupWithForm name={'updateAvatar'} title={'Обновить аватар'} buttonName={'Сохранить'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                        <div className="form__section">
                            <input className="form__input" type="url" name="avatarLink" id="input-avatarLink" placeholder="Ссылка на картинку" required />
                            <span className="form__input-error input-avatarLink-error"></span>
                        </div>
                    </PopupWithForm>

                    <PopupWithForm name={'deleteCard'} title={'Вы уверены?'} buttonName={'Да'} isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} />
                    <ImagePopup cardElement={selectedCard} onClose={closeAllPopups} />

                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
