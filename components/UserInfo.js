export default class UserInfo {
  constructor({ nameSelector, jobSelector }) { //объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
    this._nameProfile = document.querySelector(nameSelector);
    this._jobProfile = document.querySelector(jobSelector);

  }

  getUserInfo() { //возвращает объект с данными пользователя
    const userProfile = {};
    userProfile.name = this._nameProfile.textContent;
    userProfile.job = this._jobProfile.textContent;
    return userProfile;
  }

  setUserInfo(inputsUserInfo) { //принимает новые данные пользователя и добавляет их на страницу
    this._nameProfile.textContent = inputsUserInfo.username;
    this._jobProfile.textContent = inputsUserInfo.job;
  }

}

