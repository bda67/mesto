export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    // проверка ответа сервера
    _getResponseServer(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка ${res.status}`);
        }
        return res.json();
    }
// возвращает инфомрацию о пользователе с сервера
    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._getResponseServer)
    };
// установка данных пользователя
    setUserData(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._getResponseServer)
    };
// возвращает данные карточек с сервера; 
// в ответ придёт JSON с массивом карточек, которые загрузили 
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._getResponseServer)
    };
// добавление новой карточки
createNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        body: JSON.stringify({
            name: data.name,
            link: data.link
        }),
        headers: this._headers
    })
        .then(this._getResponseServer)
};

like(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
        method: 'PUT',
        headers: this._headers
    })
        .then(this._getResponseServer)
};
dislike(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
         method: 'DELETE',
         headers: this._headers
    })
        .then(this._getResponseServer)
};
deleteIdCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
        method: 'DELETE',
        headers: this._headers
    })
        .then(this._getResponseServer)
    };
setAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            avatar: data.avatar
        })
    })
    .then(this._getResponseServer)
}
}