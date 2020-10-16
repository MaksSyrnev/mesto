import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openPopup, closePopup, openImgCard } from './utils.js'

//Обьявление переменных
//попап просмотра карточки и его элементы
export const popupImgCard = document.querySelector('.popup_js_imgcard');//модальное окно просмотра
export const imgCard = popupImgCard.querySelector('.popup__img');//элемент вывода окна - изображение
export const nameImgCard = popupImgCard.querySelector('.popup__img-name');//элемент вывода окна - подпись карточки
const buttonClosePopupImgCard = popupImgCard.querySelector('.popup__button-close-form');//кнопка закрытия

//Раздел профиль: кнопка открытия окна на странице + попап профиля с кнопками
const buttonEditProfile = document.querySelector('.profile__button-edit'); // кнопка открытия редактирования со страницы
const nameProfile = document.querySelector('.profile__title'); // вывод на странице - имя
const jobProfile = document.querySelector('.profile__subtitle'); // вывод на странице - профессия
const popupEditProfile = document.querySelector('.popup_js_editprofile'); // модальное окно профиля
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__button-close-form'); // кнопка закрытия модального окна
const formEditProfile = popupEditProfile.querySelector('.popup__form_js_editprofile'); // форма данных профиля
const inputName = popupEditProfile.querySelector('.popup__input_js_username'); //поле ввода имени
const inputJob = popupEditProfile.querySelector('.popup__input_js_job'); // поле ввода профессии

inputName.value = nameProfile.textContent;    // присвоение начальных значений для попапа Профиль
inputJob.value = jobProfile.textContent;

//добавление новой карточки
const buttonAddCard = document.querySelector('.profile__button-add'); //кнопка добавить на странице
const popupAddCard = document.querySelector('.popup_js_addcard'); //окно добавления карточки
const buttonCloseAddCardPopup = popupAddCard.querySelector('.popup__button-close-form'); //кнопка закрытия окна
const inputNameCard = popupAddCard.querySelector('.popup__input_js_namecard');//поле ввода подписи карточки
const inputLinkCard = popupAddCard.querySelector('.popup__input_js_linkcard');//поле ввода ссылки на фото
const formAddCard = popupAddCard.querySelector('.popup__form_js_addcard');//форма данных карточки

//элементы страницы для работы с карточками
const elementsGallery = document.querySelector('.elements__gallery'); //контейнер куда постятся карточки

//обработчики
//форма редактировать профиль - enter или кнопка сохранить
function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = inputName.value;
  jobProfile.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

//форма добавить карточку
function formAddCardSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputNameCard.value,
    link: inputLinkCard.value
  };
  renderCard(newCard);
  popupAddCard.querySelector('.popup__form_js_addcard').reset();
  closePopup(popupAddCard);
}

//слушатели
//добавить карточку
buttonAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
});

buttonCloseAddCardPopup.addEventListener('click', function () {
  closePopup(popupAddCard);
});

formAddCard.addEventListener('submit', formAddCardSubmitHandler);

//редактировать профиль
buttonEditProfile.addEventListener('click', function () {
  openPopup(popupEditProfile);
});

buttonCloseEditProfile.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);

//просмотр карточки
buttonClosePopupImgCard.addEventListener('click', function () {
  closePopup(popupImgCard);
});

//работа с данными
//отрисовка для одной карточки - добавление в начало
function renderCard(item) {
  const card = new Card(item, '#card');
  elementsGallery.prepend(card.createCard());
}

//Отрисовка для массива карточек на странице - добавление в конец
function renderCards(item) {
  const card = new Card(item, '#card', openImgCard);
  elementsGallery.append(card.createCard());
}

//массив карточек при первом открытии страницы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//загрузка карточек из массива
initialCards.forEach(function (item) {
  renderCards(item)
});


//объект настроек валидации по всем формам в документе
const configValidate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const editForm = new FormValidator(configValidate, '.popup__form_js_editprofile');
editForm.enableValidation();

const addForm = new FormValidator(configValidate, '.popup__form_js_addcard');
addForm.enableValidation();
