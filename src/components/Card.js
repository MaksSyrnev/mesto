class Card {
  constructor(item, cardSelector, handleCardClick, handleLikeClick, userId) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    //для лайка
    this._likes = item.likes;
    this._itemId = item._id;
    this._ownerItemId = item.owner._id;
    this._userId = userId;

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
    this._buttonLike = this._elementCard.querySelector('.elements__button-like');
    this._setEventListeners();

    this._imgCard.src = this._link;
    this._imgCard.alt = this._name;
    this._titleCard.textContent = this._name;
    this._countLikes.textContent = this._likes.length;
    this._renderLike();
    return this._elementCard;
  }

  /* _likeCard() {
    this._elementCard.querySelector('.elements__button-like').classList.toggle('elements__button-like_checked');
  } */

  _isLiked() {
    return this._likes.some(function (userLike) {
      return userLike === this._userId;
    })
  }

  _renderLike() {
    if (this._isLiked()) {
      this._buttonLike.classList.add('elements__button-like_checked');
    };
  }

  _isOwner() {
    if (this._ownerItemId === this._userId) {

    };
  }

  _deleteCard() {
    this._elementCard.innerHTML = '';
    this._elementCard.remove();
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => { this._handleLikeClick(this._id) });
    this._elementCard.querySelector('.elements__button-del').addEventListener('click', () => this._deleteCard());
    this._elementCard.querySelector('.elements__card-img').addEventListener('click', this._handleCardClick);
  }

}


export default Card;

