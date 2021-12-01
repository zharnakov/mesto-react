import React, { useEffect } from "react";
import api from "../utils/Api";

function Card({ cardElement, onCardClick, handleDeleteCardClick }) {

    function handleClick() {
        onCardClick(cardElement);
    }

    return (
        <article className="photo-grid__item" >
            <img className="photo-grid__item-image" src={cardElement.link} onClick={handleClick} />
            <button className="photo-grid__button" aria-label="удаление карточки" type="button" onClick={handleDeleteCardClick}></button>
            <div className="photo-grid__item-info">
                <h2 className="photo-grid__item-info-title">{cardElement.name}</h2>
                <button className="photo-grid__item-info-like" aria-label="Лайк-сердечко" type="button"></button>
                <span className="photo-grid__item-info-counter">{cardElement.likes.length}</span>
            </div>
        </article>
    )
}

export default Card;