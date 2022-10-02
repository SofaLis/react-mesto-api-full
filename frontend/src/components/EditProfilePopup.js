import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value)
    };

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    };

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm buttonText={'Сохранить'} name={`user`} title={`Редактировать профиль`} isOpen={props.isOpen}
            onClose={props.onClose} onSubmit={handleSubmit}>
            <input type="text" className="popup__item popup__item_name" name="name" value={name || ''}
                placeholder="Имя" required maxLength="40" minLength="2" onChange={handleChangeName}></input>
            <span className="popup__input-error name-input-error">Ошибка ввода</span>
            <input type="text" className="popup__item popup__item_job" name="about" value={description || ''}
                placeholder="О себе" required maxLength="200" minLength="2" onChange={handleChangeDescription}></input>
            <span className="popup__input-error job-input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;