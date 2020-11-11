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

//обработчики
//форма редактировать профиль - enter или кнопка сохранить
const handleEditCardFormSubmit = (evt) => {
  evt.preventDefault();
  const inputUserInfo = popupEditProfile._getInputValues();
  userInfo.setUserInfo(inputUserInfo);
  popupEditProfile.close();
}

//обработчик формы добавить карточку
const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const inputsCardInfo = popupAddCard.getInputValues();
  api.createPost(inputsCardInfo).then((card) => {
    const newElementCard = renderCardElement(card);
    cardList.addItem(newElementCard);
  });
  popupAddCard.close();
}

//инициализация классов
const popupEditProfile = new PopupWithForm('.popup_js_editprofile', handleEditCardFormSubmit);
const userInfo = new UserInfo({ nameSelector: '.profile__title', jobSelector: '.profile__subtitle' });
const popupWithImage = new PopupWithImage('.popup_js_imgcard');

const popupAddCard = new PopupWithForm('.popup_js_addcard', handleAddCardFormSubmit);




//слушатель кнопки попапа редактировать профиль
buttonEditProfile.addEventListener('click', function () {
  popupEditProfile.open();
  const inputValue = userInfo.getUserInfo();
  inputName.value = inputValue.name;
  inputJob.value = inputValue.job;
});

//слушатель- добавить карточку
buttonAddCard.addEventListener('click', function () {
  addForm.disableSubmitButton();
  popupAddCard.open();
});

//колбэк для просмотр карточки
const handleCardClick = (evt) => {
  popupWithImage.open(evt);
}

//логика отрисовки элемента карточка
const renderCardElement = (item) => {
  const card = new Card(item, '#card', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
};

//колбэк для отрисовки профиля
const rederProfile = (userData) => {
  userInfo.setUserInfo(userData);
  avatar.src = userData.avatar;

}

//работа с данными - инициализация
//включаем валидацию форм в документе
const editForm = new FormValidator(configValidate, '.popup__form_js_editprofile');
editForm.enableValidation();

const addForm = new FormValidator(configValidate, '.popup__form_js_addcard');
addForm.enableValidation();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: '812995ab-7dea-4621-b929-530b002b0397',
    'Content-Type': 'application/json'
  }
});

//получаем профиль и прописываем на страницу
api.getUserInfo().then((userData) => {
  rederProfile(userData);
});

const cardList = new Section({
  items: api.getInitialCards().then((dataCards) => dataCards),
  renderer: renderCardElement,
}, '.elements__gallery');

//получение стартового массива карточек
api.getInitialCards().then((dataCards) => {
  const cards = dataCards.map(item => {
    return {
      name: item.name,
      link: item.link,
    };
  }); console.log(cards);
  cardList.renderItems(cards);
});


