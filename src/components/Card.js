import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({ cardElement, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    function handleClick() {
        onCardClick(cardElement);
    }

    function handleLike() {
        onCardLike(cardElement);
    }

    function handleDeleteCardClick() {
        onCardDelete(cardElement);
    }

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = cardElement.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (`${isOwn ? 'photo-grid__button' : 'photo-grid__button-hidden'}`); 

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = cardElement.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`photo-grid__item-info-like ${isLiked ? 'photo-grid__item-info-like_active' : ''}`); 

    return (
        <article className="photo-grid__item" >
            <img className="photo-grid__item-image" src={cardElement.link} onClick={handleClick} alt={cardElement.name} />
            <button className={cardDeleteButtonClassName} aria-label="удаление карточки" type="button" onClick={handleDeleteCardClick}></button>
            <div className="photo-grid__item-info">
                <h2 className="photo-grid__item-info-title">{cardElement.name}</h2>
                <button className={cardLikeButtonClassName} aria-label="Лайк-сердечко" type="button" onClick={handleLike}></button>
                <span className="photo-grid__item-info-counter">{cardElement.likes.length}</span>
            </div>
        </article>
    )
}

export default Card;