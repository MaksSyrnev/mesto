export default class UserInfo {
  constructor({ nameSelector, jobSelector }, avatarSelector) {
    this._nameProfile = document.querySelector(nameSelector);
    this._jobProfile = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);

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

  setAvatar(inputsUserInfo) {
    this._avatarElement.src = inputsUserInfo.avatar;
  }

}

