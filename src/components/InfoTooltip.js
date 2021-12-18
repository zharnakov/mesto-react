import react from "react"

function InfoTooltip({ onClose, isOpen, text, imageSrc }) {
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <div className="info-tool-tip">
                    <img className="info-tool-tip__image" src={imageSrc} alt={text} />
                    <p className="info-tool-tip__text">{text}</p>
                    <button className="popup__container-close" id="close_popup-pic" aria-label="закрывающий крестик" type="button" onClick={onClose}></button>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip