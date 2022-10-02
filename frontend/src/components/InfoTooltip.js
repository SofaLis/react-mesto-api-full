import React from 'react';
import imgOk from '../images/Ok.svg'
import imgErr from '../images/Err.svg'

export default function InfoTooltip(props) {

    return (
        <section className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container popup__container_info">
                <button type="button" className="popup__close-button" onClick={props.onClose}></button>
                <div className='popup__check'>
                    <img className="popup__img-check" src={props.isAuthorization ? imgOk : imgErr}></img>
                    <span className="popup__text">{props.isAuthorizationText}</span>
                </div>
            </div>
        </section>
    )
}