import Card from './Card.js';

//Обьявление переменных
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

//попап просмотра карточки и его элементы
const popupImgCard = document.querySelector('.popup_js_imgcard');//модальное окно просмотра
const buttonClosePopupImgCard = popupImgCard.querySelector('.popup__button-close-form');//кнопка закрытия
const imgCard = popupImgCard.querySelector('.popup__img');//элемент вывода окна - изображение
const nameImgCard = popupImgCard.querySelector('.popup__img-name');//элемент вывода окна - подпись карточки

//добавление новой карточки
const buttonAddCard = document.querySelector('.profile__button-add'); //кнопка добавить на странице
const popupAddCard = document.querySelector('.popup_js_addcard'); //окно добавления карточки
const buttonCloseAddCardPopup = popupAddCard.querySelector('.popup__button-close-form'); //кнопка закрытия окна
const inputNameCard = popupAddCard.querySelector('.popup__input_js_namecard');//поле ввода подписи карточки
const inputLinkCard = popupAddCard.querySelector('.popup__input_js_linkcard');//поле ввода ссылки на фото
const formAddCard = popupAddCard.querySelector('.popup__form_js_addcard');//форма данных карточки

//элементы страницы для работы с карточками
//const cardTemplate = document.querySelector('#card').content; //шаблон карточки со страницы
const elementsGallery = document.querySelector('.elements__gallery'); //контейнер куда постятся карточки

//функции
//закрытие попапа через Esc
const closePopupEsc = (evt) => {
  if (evt.key === "Escape") {                              //если нажата Esc
    closePopup(document.querySelector('.popup_opened'));   // находим открытый и передаем аргументом в функцию закрытия
  }
};

//закрытие по клику на оверлее
const closePopupClick = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
};

//открыть попап
function openPopup(popup) {
  document.addEventListener('keydown', closePopupEsc);       //ставим слушатель на кнопку esc
  document.addEventListener('click', closePopupClick);       //ставим слушатель на клик
  popup.classList.add('popup_opened');
}

//закрыть попап
function closePopup(popup) {
  document.removeEventListener('keydown', closePopupEsc);    //снимаем слушатель на кнопку esc
  document.removeEventListener('click', closePopupClick);    //снимаем слушатель на клик
  popup.classList.remove('popup_opened');
}

//раздел редактировать профиль
//обработчик формы в модальном окне - enter или кнопка сохранить
function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = inputName.value;
  jobProfile.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

//слушатели
//document.addEventListener('keydown', closePopupEsc);       //ставим слушатель на кнопку esc
//document.addEventListener('click', closePopupClick);
//открыть окно - кнопка в разделе на странице
buttonEditProfile.addEventListener('click', function () {
  openPopup(popupEditProfile);
});

//закрыть без сохранения
buttonCloseEditProfile.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

//кнопка сохранить или enter
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);

//раздела карточки
//открыть карточку в полный экран imgTarget
// const openImgCard = (name, link) => {
//   imgCard.src = link;
//   imgCard.alt = name;
//   nameImgCard.textContent = name;
//   openPopup(popupImgCard);
// }

//слушатель
//закрыть окно просмотра карточки - кнопка
buttonClosePopupImgCard.addEventListener('click', function () {
  closePopup(popupImgCard);
});

//отрисовка для одной карточки - добавление в начало
function renderCard(item) {
  const card = new Card(item, '#card');
  elementsGallery.prepend(card.createCard());
}

//Отрисовка для массива карточек на странице - добавление в конец
function renderCards(item) {
  const card = new Card(item, '#card');
  elementsGallery.append(card.createCard());
}

//добавить карточку
//обработчик формы добавить карточку
function formAddCardSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputNameCard.value,
    link: inputLinkCard.value
  };
  renderCard(newCard);
  popupAddCard.querySelector('.popup__form_js_addcard').reset(); //очищаем поля
  closePopup(popupAddCard);                                      //закрываем форму добавления карточки
}

//слушатели
//открыть окно -добавить карточку- кнопка
buttonAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
});

//закрыть окно -добавить карточку- кнопка
buttonCloseAddCardPopup.addEventListener('click', function () {
  closePopup(popupAddCard);
});

//слушатель на форме добавления карточки: кнопка сохранить или enter
formAddCard.addEventListener('submit', formAddCardSubmitHandler);

//работа с начальными данными
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


