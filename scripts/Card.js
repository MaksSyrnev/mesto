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

  _getTemplateView() {
    const popupImgCard = document.querySelector('.popup_js_imgcard');
    return popupImgCard;
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
    this._popupImgCard = this._getTemplateView();
    this._setEventListenersView();

    this._popupImgCard.querySelector('.popup__img').src = this._link;
    this._popupImgCard.querySelector('.popup__img').alt = this._name;
    this._popupImgCard.querySelector('.popup__img-name').textContent = this._name;
    this._popupImgCard.classList.add('popup_opened');

  }

  _setEventListeners() {
    this._elementCard.querySelector('.elements__button-like').addEventListener('click', () => this._likeCard());
    this._elementCard.querySelector('.elements__button-del').addEventListener('click', () => this._deleteCard());
    this._elementCard.querySelector('.elements__card-img').addEventListener('click', () => this._viewCard());

  }

  _setEventListenersView() {
    document.addEventListener('keydown', this._closePopupEsc);
    document.addEventListener('click', this._closePopupClick);
  }

  _removeEventListenerDocument() {
    document.removeEventListener('keydown', this._closePopupEsc);
    document.removeEventListener('click', this._closePopupClick);

  }

  _closePopupEsc(evt) {
    if (evt.key === "Escape") {
      document.querySelector('.popup_opened').classList.remove('popup_opened');
      console.log(evt);
      this._removeEventListenerDocument;

    }
  }

  _closePopupClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      document.removeEventListener('keydown', this._closePopupEsc);
      document.removeEventListener('click', this._closePopupClick);
      evt.target.classList.remove('popup_opened');
    };
  }


}


export default Card;

