export default class UserInfo {
  constructor({ nameSelector, jobSelector }, avatarSelector) {
    this._nameProfile = document.querySelector(nameSelector);
    this._jobProfile = document.querySelector(jobSelector);
    this._avatarSelector = avatarSelector;
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
    this._avatarElement = this._getTemplate();
    this._avatarElement.src = inputsUserInfo.avatar;
    document.querySelector('.profile__block').prepend(this._avatarElement);

  }

  deleteAvatar() {
    this._avatarElement.innerHTML = '';
    this._avatarElement.remove();
  }

  _getTemplate() {
    const avatarElement = document
      .querySelector(this._avatarSelector)
      .content.querySelector('.profile__avatar')
      .cloneNode(true);
    return avatarElement;
  }

}

