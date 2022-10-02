import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

export default function EditAvatarPopup(props) {
  const avatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatar.current.value
    });
  }

  return (
    <PopupWithForm buttonText={'Сохранить'} name={`avatar`} title={`Обновить аватар`} isOpen={props.isOpen} onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input type="url" className="popup__item popup__item_name" name="avatar" placeholder="Ссылка на картинку" required ref={avatar}></input>
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  )

}