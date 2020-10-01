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
const cardTemplate = document.querySelector('#card').content; //шаблон карточки со страницы
const elementsGallery = document.querySelector('.elements__gallery'); //контейнер куда постятся карточки




//общие функции - переиспользуемые
//открыть попап
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

//закрыть попап
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

//------------------------------------------------------------------------
//функциональная часть раздела редактировать профиль
//обработчик формы в модальном окне - enter или кнопка сохранить
function formEditProfileSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameProfile.textContent = inputName.value;
  jobProfile.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

//слушатели нажатия кнопок
//открыть окно - кнопка в разделе на странице
buttonEditProfile.addEventListener('click', function() {
  inputName.value = nameProfile.textContent; //подставляем значения из профиля в форму
  inputJob.value = jobProfile.textContent;
  openPopup(popupEditProfile);
});

//закрыть окно без сохранения
buttonCloseEditProfile.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

//кнопка сохранить в форме или enter
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);

//---------------------------------------------------------------------------
//функционал раздела карточки
//функция просмотра карточки в полный экран
function openImgCard(imgTarget) {
  imgCard.src = imgTarget.src;
  imgCard.alt = imgTarget.alt;
  nameImgCard.textContent = imgTarget.alt;
  openPopup(popupImgCard);
}

//лайкнуть карточку
function likeImgCard(imgTarget) {
  imgTarget.classList.toggle('elements__button-like_checked');
}

//удалить карточку
function deleteImgCard(imgTarget) {
  imgTarget.closest('.elements__card').remove();
}

//сборка карточки
function createCard(item) {
  //клонируем шаблон карточки и выделим нужные элементы карточки в переменные
  const cardElement = cardTemplate.cloneNode(true); //шаблон
  const cardElementImg = cardElement.querySelector('.elements__card-img'); //изображение
  const cardElementName = cardElement.querySelector('.elements__card-title'); //название
  const cardElementButtonLike = cardElement.querySelector('.elements__button-like');//кнопка лайк
  const cardElementButtonDel = cardElement.querySelector('.elements__button-del');//кнопка удаления
  //присвоение значений
  cardElementImg.src = item.link;//ссылка на изображение
  cardElementImg.alt = item.name;//подпись обязательного атрибута
  cardElementName.textContent = item.name;//название
  //вешаем слушатели на кнопки в карточке !до добавления
  //открытие изображения
  cardElementImg.addEventListener('click', function(evt){
    openImgCard(evt.target);
    });
  //лайк
  cardElementButtonLike.addEventListener('click', function(evt) {
    likeImgCard(evt.target);
    });
  //удаление
  cardElementButtonDel.addEventListener('click', function(evt) {
    deleteImgCard(evt.target);
    });

  return cardElement;
  }

//отрисовка для одной карточки - добавление в начало
function renderCard(item) {
  elementsGallery.prepend(createCard(item));
  }

//Отрисовка для массива карточек на странице - добавление в конец
function renderCards(item) {
  elementsGallery.append(createCard(item));
    }

//слушатель
//закрыть окно просмотра карточки - кнопка
buttonClosePopupImgCard.addEventListener('click', function(){
  closePopup(popupImgCard);
});

//форма добавить карточку
//обработчик формы добавить карточку
function formAddCardSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const newCard = {
        name: inputNameCard.value,
        link: inputLinkCard.value
                  };
  renderCard(newCard);
  inputLinkCard.value = ''; //очищаем поля
  inputNameCard.value = ''; //очищаем поля
  closePopup(popupAddCard); //закрываем форму добавления карточки
}

//слушатели
//открыть окно -добавить карточку- кнопка
buttonAddCard.addEventListener('click', function() {
  openPopup(popupAddCard);
});

//закрыть окно -добавить карточку- кнопка
buttonCloseAddCardPopup.addEventListener('click', function() {
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
initialCards.forEach(function(item) {
  renderCards(item);
});

//закрытие попапа через Esc
document.addEventListener('keydown', function (evt) { // навесили слушатель нажатия клавиатуры на весь документ
  if (evt.key === "Escape") {                         //если нажата Esc
    const popupList = Array.from(document.querySelectorAll('.popup')); // находим попапы
    popupList.forEach((popupElement) => {
      closePopup(popupElement);                        //мощный финал
      });
    };
});


// document.addEventListener('click', function () {
//   console.log('На что ни нажми — я появлюсь');
// });
