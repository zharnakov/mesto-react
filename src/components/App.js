import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

    const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '', _id: '' });

    useEffect(() => {
        api.getUserInfo()
            .then((objectInfo) => {
                setCurrentUser(objectInfo)
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

    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);

    function handleDeleteCardClick(card) {
        setIsDeleteCardPopupOpen(true);
        setCardForRemoval(card)
    }

    const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });

    const [cardForRemoval, setCardForRemoval] = useState({_id: ""});

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

    function handleUpdateUser(newObjectInfo) {
        api.changeUserInfo(newObjectInfo)
        .then((objectInfo) => {
            setCurrentUser(objectInfo)
            closeAllPopups()
        })
        .catch((err) => alert(err));
    }

    function handleUpdateAvatar(newObjectWithSrcOnAvatar) {
        api.changeUserPhoto(newObjectWithSrcOnAvatar)
        .then((objectInfo) => {
            setCurrentUser(objectInfo)
            closeAllPopups()
        })
        .catch((err) => alert(err));
    }

    const [cards, setCards] = useState([]);

    function handleCardLike(card) {
        // проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => alert(err));;
    }

    function handleCardDelete(e) {
        e.preventDefault();
        api.deleteCard(cardForRemoval._id)
            .then(() => {
                setCards((state) => state.filter((item) => item._id !== cardForRemoval._id));
                closeAllPopups();
                setCardForRemoval({_id: ""});
            })
            .catch((err) => alert(err));
    }

    useEffect(() => {
        api.getAllCards()
            .then((cardList) => {
                setCards(cardList)
            })
            .catch((err) => alert(err));
    }, [])

    function handleAddPlaceSubmit(formValues) {
        api.addCard(formValues)
        .then((newCard) => {
            setCards([newCard, ...cards]); 
            closeAllPopups()

        })
        .catch((err) => alert(err));
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Header />
                    <Main handleEditProfileClick={handleEditProfileClick} handleAddPlaceClick={handleAddPlaceClick} handleEditAvatarClick={handleEditAvatarClick} handleDeleteCardClick={handleDeleteCardClick} onCardClick={handleCardClick} onCardLike={handleCardLike} cards={cards} />
                    <Footer />
                    
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />  
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                    <PopupWithForm name={'deleteCard'} title={'Вы уверены?'} buttonName={'Да'} isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onSubmit={handleCardDelete}/>
                    <ImagePopup cardElement={selectedCard} onClose={closeAllPopups} />

                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
