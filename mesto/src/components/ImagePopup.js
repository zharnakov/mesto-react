import React from "react";


function ImagePopup({cardElement, onClose}) {
return (
    <div className={`popup ${cardElement && 'popup_opened'}`} id="openPic">
    <div className="popup__container popup__container_background_none">
        <img className="open-pic" src={cardElement ? cardElement.link : ''} alt={cardElement ? cardElement.name : ''} />
        <p className="open-pic-text">{cardElement ? cardElement.name : ''}</p>
        <button className="popup__container-close" id="close_popup-pic" aria-label="закрывающий крестик" type="button" onClick={onClose}></button>
    </div>
</div>
)
}

export default ImagePopup;