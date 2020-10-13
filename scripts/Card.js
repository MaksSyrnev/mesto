class Card {
  constructor(item, cardSelector, openImgCard) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._openImgCard = openImgCard;
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

  _setEventListeners() {
    this._elementCard.querySelector('.elements__button-like').addEventListener('click', () => this._likeCard());
    this._elementCard.querySelector('.elements__button-del').addEventListener('click', () => this._deleteCard());
    this._elementCard.querySelector('.elements__card-img').addEventListener('click', this._openImgCard);
  }

}


export default Card;

