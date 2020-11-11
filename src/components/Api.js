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

  saveUserInfo() {
    fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist'
      })
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

}




export default Api;
