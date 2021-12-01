class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    changeUserPhoto(avatar) {
        return fetch(this._url + "/users/me/avatar", {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(avatar)
        }).then(this._checkResponse);
    }

    changeLikeCardStatus(idCard, myLike) {
        if (myLike) {
            return fetch((`${this._url + "/cards/likes"}/${idCard}`), {
                method: 'DELETE',
                headers: this._headers
            }).then(this._checkResponse); 
        } else {
            return fetch((`${this._url + "/cards/likes"}/${idCard}`), {
                method: 'PUT',
                headers: this._headers
            }).then(this._checkResponse); 
        }
    }

    deleteCard(idCard) {
        return fetch((`${this._url + "/cards"}/${idCard}`), {
            method: 'DELETE',
            headers: this._headers
        }).then(this._checkResponse);
    }

    changeUserInfo(data) {
        return fetch(this._url + "/users/me", {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._checkResponse);
    }

    addCard(data) {
        return fetch(this._url + "/cards", {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._checkResponse);
    }

    getAllCards() {
        return fetch(this._url + "/cards", {
            method: 'GET',
            headers: this._headers
        }).then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(this._url + "/users/me", {
            method: 'GET',
            headers: this._headers
        }).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }
};

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-29",
    headers: {
        Authorization: "49b668cb-f214-4312-b556-8e7c4d7fb9cc",
        "content-type": "application/json"
    }
})

export default api;
