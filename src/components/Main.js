import React, { useState, useEffect } from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main({ handleEditAvatarClick, handleEditProfileClick, handleAddPlaceClick, handleDeleteCardClick, onCardClick }) {

    const [userName, setUserName] = useState("");

    const [userDescription, setUserDescription] = useState("");

    const [userAvatar, setUserAvatar] = useState("");

    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfo()
        .then((objectInfo) => {
            setUserName(objectInfo.name);
            setUserDescription(objectInfo.about);
            setUserAvatar(objectInfo.avatar)
        })
        .catch((err) => alert(err));

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
                        <img className="researcher__profile-image" src={userAvatar} alt="Жак-Ив Кусто"  />
                    </div>

                    <div className="researcher__profile-text">

                        <div className="researcher__profile-text-top">
                            <h1 className="researcher__title">{userName}</h1>
                            <button className="researcher__edit-button" id="open_popup_btn" aria-label="Редактировать профиль" type="button" onClick={handleEditProfileClick}></button>
                        </div>
                        <p className="researcher__profile-text-discription">{userDescription}</p>

                    </div>
                </div>

                <button className="researcher__button" type="button" id="open_popup_addcards" aria-label="Добавить картинку" onClick={handleAddPlaceClick}></button>

            </section>

            <section className="photo-grid">
                {cards.map((cardElement) => (
                   <Card key={cardElement._id} cardElement={cardElement} onCardClick={onCardClick} handleDeleteCardClick={handleDeleteCardClick}  />
                ))}
            </section>

        </main>
    )  
}

export default Main;
