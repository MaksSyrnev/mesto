let popupEditProfile = document.querySelector('.popup_js_editprofile'); // получим обьект модальное окно из DOM в переменную
let editButton = document.querySelector('.profile__button-edit'); // кнопку редактирования и ниже другие элементы
let closeButtonEditProfile = popupEditProfile.querySelector('.popup__button-close-form');
let saveButtonEditProfile = popupEditProfile.querySelector('.popup__button-save-form');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');
let inputName = popupEditProfile.querySelector('.popup__form-input_js_username');
let inputJob = popupEditProfile.querySelector('.popup__form-input_js_job');
let formEditProfile = popupEditProfile.querySelector('.popup__form_js_editprofile'); // Находим форму в DOM

let popupImgCard = document.querySelector('.popup_js_imgcard');
let closeButtonImgCard = popupImgCard.querySelector('.popup__button-close-form');
let imgCard = popupImgCard.querySelector('.popup__img');
let nameImgCard = popupImgCard.querySelector('.popup__img-name');

let popupAddCard = document.querySelector('.popup_js_addcard'); // Получаем доступ к элементам формы добавления карточки
let addButton = document.querySelector('.profile__button-add');
let closeButtonAddCard = popupAddCard.querySelector('.popup__button-close-form');
let inputNameCard = popupAddCard.querySelector('.popup__form-input_js_namecard');
let inputLinkCard = popupAddCard.querySelector('.popup__form-input_js_linkcard');
let formAddCard = popupAddCard.querySelector('.popup__form_js_addcard'); // Находим форму добавления карточки в DOM

const cardTemplate = document.querySelector('#card').content; //находим шаблон карточки на странице
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
//вешаем обработчики кнопок карточки до добавлении
//открытие изображения
cardElement.querySelector('.elements__card-img').addEventListener('click', function (evt) {
  const eventTarget = evt.target;
  imgCard.src = eventTarget.src;
  imgCard.alt = eventTarget.alt;
  nameImgCard.textContent = eventTarget.alt;
  formOpenImgCard();
  });

//лайк
cardElement.querySelector('.elements__button-like').addEventListener('click', function (evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('elements__button-like_checked');
  });

//удаление
cardElement.querySelector('.elements__button-del').addEventListener('click', function (evt) {
  const buttonDelTarget = evt.target;
  const CardsItem = buttonDelTarget.closest('.elements__card');
  CardsItem.remove();
  });

//добавляем на страницу
elementsGallery.append(cardElement);//добавляем карточку в контейнер-галлерею для отображания на странице
});


//функции формы редактирования профиля
//закрытие окна редактирования профиля
function formCloseEditProfile () {
  popupEditProfile.classList.remove('popup_opened');
}


//открытие редактирования профиля
function formOpenProfile () {
  popupEditProfile.classList.add('popup_opened');
  inputName.value = nameProfile.textContent; //подставляем значения из профиля в форму
  inputJob.value = jobProfile.textContent;
}


// Обработчик «отправки» формы редактирования профиля
function formEditProfileSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    nameProfile.textContent = inputName.value;
    jobProfile.textContent = inputJob.value;
    formCloseEditProfile();
}


//Форма добавления карточки
//открытие и закрытие формы добавления карточки
function formOpenCloseAddCard () {
  popupAddCard.classList.toggle('popup_opened');
}


//Обработчик формы добавление карточки
function formAddCardSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const cardElementNew = cardTemplate.cloneNode(true); //клонируем и наполняем шаблон полученными значениями
  cardElementNew.querySelector('.elements__card-img').src = inputLinkCard.value;
  cardElementNew.querySelector('.elements__card-img').alt = inputNameCard.value;
  cardElementNew.querySelector('.elements__card-title').textContent = inputNameCard.value

  //вешаем обработчики кнопок при добавлении
  //открытие изображения в полный экран
  cardElementNew.querySelector('.elements__card-img').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    imgCard.src = eventTarget.src;
    imgCard.alt = eventTarget.alt;
    nameImgCard.textContent = eventTarget.alt;
    formOpenImgCard();
    });
  //лайк
  cardElementNew.querySelector('.elements__button-like').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('elements__button-like_checked');
    });
  //удаление
  cardElementNew.querySelector('.elements__button-del').addEventListener('click', function (evt) {
    const buttonDelTarget = evt.target;
    const CardsItem = buttonDelTarget.closest('.elements__card');
    CardsItem.remove();
    });

  elementsGallery.prepend(cardElementNew); //добавляем на страницу
  inputLinkCard.value = ''; //очищаем поля
  inputNameCard.value = '' ; //очищаем поля

  formOpenCloseAddCard(); //закрываем форму добавления карточки
}


//открытие формы просмотра карточки в полный экран
function formOpenImgCard () {
  popupImgCard.classList.add('popup_opened');
}

//закрытие формы просмотра карточки в полный экран
function formCloseImgCard () {
  popupImgCard.classList.remove('popup_opened');
}


//обработчики событий
//окно редактирования профиля
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
editButton.addEventListener('click', formOpenProfile);
closeButtonEditProfile.addEventListener('click', formCloseEditProfile);

//окно добавление карточки
formAddCard.addEventListener('submit', formAddCardSubmitHandler);
addButton.addEventListener('click', formOpenCloseAddCard);
closeButtonAddCard.addEventListener('click', formOpenCloseAddCard);

//окно просмотра карточки в полный экран
closeButtonImgCard.addEventListener('click', formCloseImgCard);
