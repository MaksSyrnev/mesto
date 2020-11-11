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

  setUserInfo() {

  }
  //   fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me', {
  //   method: 'PATCH',
  //   headers: {
  //     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     name: 'Marie Skłodowska Curie',
  //     about: 'Physicist and Chemist'
  //   })
  // });

}


export default Api;
