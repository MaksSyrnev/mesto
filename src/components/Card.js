class Card {
  constructor(item, cardSelector, handleCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this.likes = item.likes;

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
    this._imgCard = this._elementCard.querySelector('.elements__card-img');
    this._titleCard = this._elementCard.querySelector('.elements__card-title');
    this._countLikes = this._elementCard.querySelector('.elements__card-count-like');
    this._setEventListeners();

    this._imgCard.src = this._link;
    this._imgCard.alt = this._name;
    this._titleCard.textContent = this._name;
    this._countLikes.textContent = this.likes.length;
    return this._elementCard;
  }

  _likeCard() {
    this._elementCard.querySelector('.elements__button-like').classList.toggle('elements__button-like_checked');
  }

  _deleteCard() {
    this._elementCard.innerHTML = '';
    this._elementCard.remove();
  }

  _setEventListeners() {
    this._elementCard.querySelector('.elements__button-like').addEventListener('click', () => this._likeCard());
    this._elementCard.querySelector('.elements__button-del').addEventListener('click', () => this._deleteCard());
    this._elementCard.querySelector('.elements__card-img').addEventListener('click', this._handleCardClick);
  }

}


export default Card;

