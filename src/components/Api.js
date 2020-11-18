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
        return Promise.reject(new Error(`Что-то пошло не так: ${res.status}`));
      })

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
        return Promise.reject(new Error(`Что-то пошло не так: ${res.status}`));
      })

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
        return Promise.reject(new Error(`Что-то пошло не так: ${res.status}`));
      })

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
        return Promise.reject(new Error(`Что-то пошло не так: ${res.status}`));
      })

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
        return Promise.reject(new Error(`Что-то пошло не так: ${res.status}`));
      })

  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, { headers: this.headers })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Что-то пошло не так: ${res.status}`));
      })

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
        return Promise.reject(new Error(`Что-то пошло не так: ${res.status}`));
      })

  }

  setNewAvatar(userInfo) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: userInfo.avatar,
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Что-то пошло не так: ${res.status}`));
      })

  }


}

export default Api;
