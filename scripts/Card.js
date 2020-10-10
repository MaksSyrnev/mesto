class Card {
  constructor(item, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.elements__card')
      .cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._elementCard = this._getTemplate();
    this._setEventListeners();

    this._elementCard.querySelector('.elements__card-img').src = this._link;
    this._elementCard.querySelector('.elements__card-title').textContent = this._name;
    this._elementCard.querySelector('.elements__card-img').alt = this._name;

    return this._elementCard;
  }

  _likeCard() {
    this._elementCard.querySelector('.elements__button-like').classList.toggle('elements__button-like_checked');
  }

  _deleteCard() {
    this._elementCard.remove();
  }

  _viewCard() {
    //imgCard.src = this._link;
    //imgCard.alt = this._name;
    //nameImgCard.textContent = this._name;
    //openPopup(popupImgCard);

  }

  _setEventListeners() {
    this._elementCard.querySelector('.elements__button-like').addEventListener('click', () => this._likeCard());
    this._elementCard.querySelector('.elements__button-del').addEventListener('click', () => this._deleteCard());
    this._elementCard.querySelector('.elements__card-img').addEventListener('click', () => this._viewCard());
  }

}

export default Card;

/*
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

const elementsGallery = document.querySelector('.elements__gallery'); //контейнер куда постятся карточки

//раздела карточки
//открыть карточку в полный экран
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

//собрать новую карточку
//const cardTemplate = document.querySelector('#card').content; //шаблон карточки со страницы
function createCard(item) {
  //клонируем шаблон карточки и выделим нужные элементы карточки в переменные
  //const cardElement = cardTemplate.cloneNode(true); //шаблон
 // const cardElementImg = cardElement.querySelector('.elements__card-img'); //изображение
 // const cardElementName = cardElement.querySelector('.elements__card-title'); //название
  const cardElementButtonLike = cardElement.querySelector('.elements__button-like');//кнопка лайк
  const cardElementButtonDel = cardElement.querySelector('.elements__button-del');//кнопка удаления
  //присвоение значений
 // cardElementImg.src = item.link;//ссылка на изображение
  //cardElementImg.alt = item.name;//подпись alt
  //cardElementName.textContent = item.name;//название
  //вешаем слушатели на кнопки в карточке !до добавления
  //открытие изображения
  cardElementImg.addEventListener('click', function (evt) {
    openImgCard(evt.target);
  });
  //лайк
  cardElementButtonLike.addEventListener('click', function (evt) {
    likeImgCard(evt.target);
  });
  //удаление
  cardElementButtonDel.addEventListener('click', function (evt) {
    deleteImgCard(evt.target);
  });
  return cardElement;
}
, cardSelector
*/
