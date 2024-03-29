class Api {
    constructor(options){
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    };
    
    //Загрузка информации о пользователе с сервера
    getUserInfo() { 
        return fetch(`${this._baseUrl}/users/me`, { 
            credentials:'include',
            headers: this._headers,
        })
            .then((res) => {
            return this._testStatus(res)
            }) 
    };

    //Загрузка карточек с сервера 
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            credentials:'include',
            headers: this._headers
        })

        .then((res) => {
            return this._testStatus(res)
          })
    };

    //Редактирование профиля
    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`,
        {
            method: 'PATCH',
            credentials:'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then((res) => {
            return this._testStatus(res)
          })
    };

    //Добавление новой карточки
    addCard (name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            credentials:'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })

        .then((res) => {
            return this._testStatus(res)
          })
    };

    //Редактирование аватара
    editAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, 
        {
            method: 'PATCH',
            credentials:'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then((res) => {
            return this._testStatus(res)
        })
    };

    //Удаление
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, { 
          method: 'DELETE',
          credentials:'include',
          headers: this._headers,
        })
        .then((res) => {
            return this._testStatus(res)
        })
    };

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this._like(cardId);
        } else {
            return this._dltLike(cardId);        
        }
    }

    //Постановка лайка
    _like(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, { 
          method: 'PUT',
          credentials:'include',
          headers: this._headers,
        })
        .then((res) => {
            return this._testStatus(res)
        }) 
    };

    //Удаление лайка
    _dltLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, { 
            method: 'DELETE',
            credentials:'include',
            headers: this._headers,
          })
          .then((res) => {
              return this._testStatus(res)
          })
    };

    //Проверяем на ошибку
    _testStatus(res) {
        if (res.ok) { 
            return res.json();
        }
        return Promise.reject(`${res}`);
    }

}
 const api = new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  export default api