//Токен: 812995ab - 7dea - 4621 - b929 - 530b002b0397
//Идентификатор группы: cohort - 17
class Api {
  constructor(options) {
    // тело конструктора
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, { headers: this.headers })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .then((dataCards) => {
        return dataCards;
      })
      .catch((err) => {
        console.log(err); // "Что-то пошло не так: ..."
      });
  }

  createPost(newCard) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link
      }),
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .then((newCard) => {
        return newCard;
      })
      .catch((err) => {
        console.log('Ошибка. Карточка не загружена ', err);
      });

  }

  deletePost(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return status = res.ok
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .catch((err) => {
        console.log('Ответ от сервера не получен ', err);
      });

  }

  likePost(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {   // https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId
      method: 'PUT',
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log('Ответ от сервера не получен ', err);
      });

  }

  unlikePost(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log('Ответ от сервера не получен ', err);
      });

  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, { headers: this.headers })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .then((userInfo) => {
        return userInfo;
      })
      .catch((err) => {
        console.log(err); // "Что-то пошло не так: ..."
      });

  }

  saveUserInfo(userInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .then((userData) => {
        return userData;
      })
      .catch((err) => {
        console.log(err); // "Что-то пошло не так: ..."
      });
  }

  setNewAvatar(userInfo) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: userInfo.avatar,
      })
    })
      .then(() => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .then((userData) => {
        return userData;
      })
      .catch((err) => {
        console.log(err); // "Что-то пошло не так: ..."
      });
  }



}




export default Api;
