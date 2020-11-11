export default class UserInfo {
  constructor({ nameSelector, jobSelector }) { //объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
    this._nameProfile = document.querySelector(nameSelector);
    this._jobProfile = document.querySelector(jobSelector);
    //this.userProfile = {};
  }

  getUserInfo() { //возвращает объект с данными пользователя
    this.userProfileName = this._nameProfile.textContent;
    this.userProfileJob = this._jobProfile.textContent;
    return { name: this.userProfileName, job: this.userProfileJob }//this.userProfile;
  }

  setUserInfo(inputsUserInfo) { //принимает новые данные пользователя и добавляет их на страницу
    this._nameProfile.textContent = inputsUserInfo.name;
    this._jobProfile.textContent = inputsUserInfo.about;
  }

}

