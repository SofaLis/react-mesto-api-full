import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardDeleteButtonClassName = (
        `element__delete ${isOwn ? 'element__delete_visible' : 'element__delete_opracity'}`
    );

    const cardLikeButtonClassName = (
        `element__button ${isLiked ? 'element__button_active' : 'element__button_inactive'}`
    );

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <div className="element">
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} ></button>
            <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick}></img>
            <div className="element__caption">
                <h3 className="element__name">{props.card.name}</h3>
                <div className="element__case">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} ></button>
                    <span className="element__like">{props.card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}