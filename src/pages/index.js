import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import { configValidate, buttonEditProfile, buttonAddCard, inputName, inputJob, avatar } from '../components/constants.js';
import PopupYes from '../components/PopupYes';

const ownerUser = { id: "" }; //id пользователя.
//обработчики
//обработчик формы добавить карточку
const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const inputsCardInfo = popupAddCard.getInputValues();
  api.createPost(inputsCardInfo).then((card) => {
    console.log(card);
    const newElementCard = renderCardElement(card);
    cardList.addItem(newElementCard);
  });
  popupAddCard.close();
}

//обработчик формы редактировать профиль - enter или кнопка сохранить
const handleEditProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const inputUserInfo = popupEditProfile.getInputValues();
  api.saveUserInfo(inputUserInfo).then((userData) => {
    userInfo.setUserInfo(userData);
  })
  popupEditProfile.close();
}

//обработчик формы редактировать аватар
const handleEditAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  const inputsCardInfo = popupEditAvatar.getInputValues();
  api.setNewAvatar(inputsCardInfo).then((userData) => {
    //avatar.src = userData.avatar;
    userInfo.setAvatar(userData);
  });
  popupEditAvatar.close();
}

//обработчик удаления
const handleDeleteCardFormSubmit = (evt) => {
  evt.preventDefault();
  popupYes.close();
}

//инициализация классов
const popupEditProfile = new PopupWithForm('.popup_js_editprofile', handleEditProfileFormSubmit);
const userInfo = new UserInfo({ nameSelector: '.profile__title', jobSelector: '.profile__subtitle' }, '#avatar', handleAvatarClick);
const popupWithImage = new PopupWithImage('.popup_js_imgcard');
const popupYes = new PopupYes('.popup_js_yes', handleDeleteCardFormSubmit);
const popupAddCard = new PopupWithForm('.popup_js_addcard', handleAddCardFormSubmit);
const popupEditAvatar = new PopupWithForm('.popup_js_avatar', handleEditAvatarFormSubmit);

//слушатели событий
//кнопка добавить карточку
buttonAddCard.addEventListener('click', function () {
  addForm.disableSubmitButton();
  popupAddCard.open();
});

//кнопка попапа редактировать профиль
buttonEditProfile.addEventListener('click', function () {
  popupEditProfile.open();
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputJob.value = userData.job;
});

//аватар
// avatar.addEventListener('click', function () {
//   popupEditAvatar.open();
// });
const handleAvatarClick = (evt) => {
  popupEditAvatar.open();
}

//колбеки - функции, которые передаем в экземпляры классов при создании
//колбэк для просмотр карточки - зум
const handleCardClick = (evt) => {
  popupWithImage.open(evt);
}

//лакнуть
function handleLikeClick(id) {
  console.log(id);
  //evt.target.classList.toggle('elements__button-like_checked');
}

//сборка элемента карточка
const renderCardElement = (item) => {
  const card = new Card(item, '#card', handleCardClick, handleLikeClick, ownerUser.id);
  const cardElement = card.createCard();
  return cardElement;
};


//работа с данными - инициализация
//включаем валидацию форм в документе
const editForm = new FormValidator(configValidate, '.popup__form_js_editprofile');
editForm.enableValidation();

const addForm = new FormValidator(configValidate, '.popup__form_js_addcard');
addForm.enableValidation();

const avatarForm = new FormValidator(configValidate, '.popup__form_js_avatar');
avatarForm.enableValidation();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: '812995ab-7dea-4621-b929-530b002b0397',
    'Content-Type': 'application/json'
  }
});

//получаем профиль и прописываем на страницу
api.getUserInfo().then((userData) => {
  userInfo.setUserInfo(userData);
  userInfo.setAvatar(userData);
  ownerUser.id = userData._id;
  console.log(ownerUser);
});

const cardList = new Section({
  items: api.getInitialCards().then((dataCards) => dataCards),
  renderer: renderCardElement,
}, '.elements__gallery');

//получение стартового массива карточек
api.getInitialCards().then((dataCards) => {
  cardList.renderItems(dataCards);
});


