
let popupEditProfile = document.querySelector('.popup_js_editprofile'); // получим обьект модальное окно из DOM в переменную
let editButton = document.querySelector('.profile__button-edit'); // кнопку редактирования и ниже другие элементы
let closeButtonEditProfile = popupEditProfile.querySelector('.popup__button-close-form');
let saveButtonEditProfile = popupEditProfile.querySelector('.popup__button-save-form');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');
let inputName = popupEditProfile.querySelector('.popup__form-input_js_username');
let inputJob = popupEditProfile.querySelector('.popup__form-input_js_job');
let formEditProfile = popupEditProfile.querySelector('.popup__form_js_editprofile'); // Находим форму в DOM

let popupAddCard = document.querySelector('.popup_js_addcard'); // Получаем доступ к элементам формы добавления карточки
let addButton = document.querySelector('.profile__button-add');
let closeButtonAddCard = popupAddCard.querySelector('.popup__button-close-form');
let inputNameCard = popupAddCard.querySelector('.popup__form-input_js_namecard');
let inputLinkCard = popupAddCard.querySelector('.popup__form-input_js_linkcard');
let formAddCard = popupAddCard.querySelector('.popup__form_js_addcard'); // Находим форму добавления карточки в DOM

const cardTemplate = document.querySelector('#card').content; //находим шаблон картоки на странице
const elementsGallery = document.querySelector('.elements__gallery'); //контейнер для карточек

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

//загрузим карточки из массива
initialCards.forEach(function (item) {
//наполним по шаблону одну карточку данными из первого элемента массива
const cardElement = cardTemplate.cloneNode(true);
cardElement.querySelector('.elements__card-img').src = item.link;
cardElement.querySelector('.elements__card-img').alt = item.name;
cardElement.querySelector('.elements__card-title').textContent = item.name;

elementsGallery.append(cardElement);//добавляем карточку в контейнер-галлерею для отображания на странице
});


//задекларируем функцию закрытия окна профиля
function formCloseEditProfile () {
  popupEditProfile.classList.remove('popup_opened');
}

//функция открытия профиля
function formOpenProfile () {
  popupEditProfile.classList.add('popup_opened');
  inputName.value = nameProfile.textContent; //подставляем значения из профиля в форму
  inputJob.value = jobProfile.textContent;
}


// Обработчик «отправки» формы
function formEditProfileSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    nameProfile.textContent = inputName.value;
    jobProfile.textContent = inputJob.value;
    formCloseEditProfile();
}

//открытие и закрытие формы добавления
function formOpenCloseAddCard () {
  popupAddCard.classList.toggle('popup_opened');
}

//Обработчик формы добавление карточки
function formAddCardSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const cardElementNew = cardTemplate.cloneNode(true);
  cardElementNew.querySelector('.elements__card-img').src = inputLinkCard.value;
  cardElementNew.querySelector('.elements__card-img').alt = inputNameCard.value;
  cardElementNew.querySelector('.elements__card-title').textContent = inputNameCard.value
  elementsGallery.prepend(cardElementNew);

  formOpenCloseAddCard();
}


//обработчики событий


formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
editButton.addEventListener('click', formOpenProfile);
closeButtonEditProfile.addEventListener('click', formCloseEditProfile);

formAddCard.addEventListener('submit', formAddCardSubmitHandler);
addButton.addEventListener('click', formOpenCloseAddCard);
closeButtonAddCard.addEventListener('click', formOpenCloseAddCard);
