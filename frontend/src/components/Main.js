import api from '../utils/Api'
import React from 'react';
import Card from "./Card.js";
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <button className="profile__avatar-hover" onClick={props.onEditAvatar}></button>
                <img src={currentUser.avatar} alt="Ваша аватарка" className="profile__avatar" />
                <div className="profile__info">
                    <div className="profile__container">
                        <h2 className="profile__name">{currentUser.name}</h2>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__status">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {props.cards.map((card) => {
                    return (<Card card={card} key={card._id}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete} />)
                })}
            </section>
        </main>
    )
}