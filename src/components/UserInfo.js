export default class UserInfo {
  constructor({ nameSelector, jobSelector }, avatarSelector, handleAvatarClick) {
    this._nameProfile = document.querySelector(nameSelector);
    this._jobProfile = document.querySelector(jobSelector);
    this._avatarSelector = avatarSelector;
    this._handleAvatarClick = handleAvatarClick;
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

  _getTemplate() {
    const avatarElement = document
      .querySelector(this._avatarSelector)
      .content.querySelector('.profile__avatar')
      .cloneNode(true);
    return avatarElement;
  }

  setAvatar(inputsUserInfo) {
    this._avatarElement = this._getTemplate();
    //this._avatarElement.innerHTML = '';
    // this._setEventListener();
    this._avatarElement.src = inputsUserInfo.avatar;
    document.querySelector('.profile__block').prepend(this._avatarElement);

  }

  _setEventListener() {
    this._avatarElement.addEventListener('click', this._handleAvatarClick);
  }
}

