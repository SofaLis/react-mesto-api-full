import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

export default function AddPlacePopup(props) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleChangeName(e) {
        setName(e.target.value)
    };

    function handleChangeLink(e) {
        setLink(e.target.value)
    };

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link
        });
    }

    return (
        <PopupWithForm buttonText={'Создать'} name={`cards`} title={`Новое место`} isOpen={props.isOpen}
            onClose={props.onClose} onSubmit={handleSubmit}>
            <input type="text" id="card-name-input" className="popup__item popup__item_card_name" value={name} onChange={handleChangeName}
                name="name" placeholder="Название" required maxLength="30" minLength="2"></input>
            <span className="popup__input-error card-name-input-error"></span>
            <input type="url" id="card-link-input" className="popup__item popup__item_card_link" value={link} onChange={handleChangeLink}
                name="link" placeholder="Ссылка на картинку" required></input>
            <span className="popup__input-error card-link-input-error"></span>
        </PopupWithForm>
    )
}