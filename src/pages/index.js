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
const handleEditCardFormSubmit = (formValues) => {
  userInfo.setUserInfo(formValues);
  popupEditProfile.close();
}

//обработчик формы добавить карточку
const handleAddCardFormSubmit = (formValues) => {
  const newElementCard = renderCardElement(formValues);
  cardList.addItem(newElementCard);
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

//работа с данными - инициализация
//добавляем в разметку стартовый набор карточек из массива
const cardList = new Section({ items: initialCards, renderer: renderCardElement }, '.elements__gallery');
cardList.renderItems();

//включаем валидацию форм в документе
const editForm = new FormValidator(configValidate, '.popup__form_js_editprofile');
editForm.enableValidation();

const addForm = new FormValidator(configValidate, '.popup__form_js_addcard');
addForm.enableValidation();
