import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import { initialCards, configValidate, buttonEditProfile, buttonAddCard, inputName, inputJob } from '../components/constants.js';

//обработчики
//форма редактировать профиль - enter или кнопка сохранить
const handleEditCardFormSubmit = (evt) => {
  evt.preventDefault();
  const inputsUserInfo = popupEditProfile._getInputValues();
  userInfo.setUserInfo(inputsUserInfo);
  popupEditProfile.close();
}

//обработчик формы добавить карточку
const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const inputsCardInfo = popupAddCard._getInputValues();
  const newElementCard = renderer(inputsCardInfo);
  CardList.addItem(newElementCard);
  popupAddCard.close();
}

//инициализация классов
const popupEditProfile = new PopupWithForm('.popup_js_editprofile', handleEditCardFormSubmit);
const userInfo = new UserInfo({ nameSelector: '.profile__title', jobSelector: '.profile__subtitle' });
const inputValue = userInfo.getUserInfo();
inputName.value = inputValue.name;
inputJob.value = inputValue.job;
const popupAddCard = new PopupWithForm('.popup_js_addcard', handleAddCardFormSubmit);

//слушатель кнопки попапа редактировать профиль
buttonEditProfile.addEventListener('click', function () {
  popupEditProfile.open();
  inputName.value = inputValue.name;
  inputJob.value = inputValue.job;
});

//слушатель- добавить карточку
buttonAddCard.addEventListener('click', function () {
  popupAddCard.open();
});

//колбэк для просмотр карточки
const handleCardClick = (evt) => {
  const popupWithImage = new PopupWithImage('.popup_js_imgcard');
  popupWithImage.open(evt);
}

//логика отрисовки элемента карточка
const renderer = (item) => {
  const card = new Card(item, '#card', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
};

//работа с данными - инициализация
//добавляем в разметку стартовый набор карточек из массива
const CardList = new Section({ items: initialCards, renderer }, '.elements__gallery');
CardList.renderItems();

//включаем валидацию форм в документе
const editForm = new FormValidator(configValidate, '.popup__form_js_editprofile');
editForm.enableValidation();

const addForm = new FormValidator(configValidate, '.popup__form_js_addcard');
addForm.enableValidation();
