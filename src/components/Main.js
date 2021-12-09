import React, { useState, useEffect } from 'react';
import api from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ handleEditAvatarClick, handleEditProfileClick, handleAddPlaceClick, handleDeleteCardClick, onCardClick }) {

    const currentUser = React.useContext(CurrentUserContext);

    const [cards, setCards] = useState([]);

    function handleCardLike(card) {
        // проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then((newCard) => {
                setCards((state) => state.filter((item) => item._id !== card._id));
            });
    }


    useEffect(() => {
        api.getAllCards()
            .then((cardList) => {
                setCards(cardList)
            })
            .catch((err) => alert(err));
    }, [])

    return (
        <main className="content">

            <section className="researcher">

                <div className="researcher__profile">

                    <div className="researcher__profile-image-add" onClick={handleEditAvatarClick} >
                        <img className="researcher__profile-image" src={currentUser.avatar} alt="Жак-Ив Кусто" />
                    </div>

                    <div className="researcher__profile-text">

                        <div className="researcher__profile-text-top">
                            <h1 className="researcher__title">{currentUser.name}</h1>
                            <button className="researcher__edit-button" id="open_popup_btn" aria-label="Редактировать профиль" type="button" onClick={handleEditProfileClick}></button>
                        </div>
                        <p className="researcher__profile-text-discription">{currentUser.about}</p>

                    </div>
                </div>

                <button className="researcher__button" type="button" id="open_popup_addcards" aria-label="Добавить картинку" onClick={handleAddPlaceClick}></button>

            </section>

            <section className="photo-grid">
                {cards.map((cardElement) => (
                    <Card key={cardElement._id} cardElement={cardElement} onCardClick={onCardClick} handleDeleteCardClick={handleDeleteCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
                ))}
            </section>

        </main>
    )
}

export default Main;
