class Card {
  constructor(item, cardSelector, handleCardClick, handleLikeClick, handleDelClick, userId) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDelClick = handleDelClick;
    //для лайка
    this.likes = item.likes;
    this.itemId = item._id;
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
    this._buttonDel = this._elementCard.querySelector('.elements__button-del');
    this._setEventListeners();

    this._imgCard.src = this._link;
    this._imgCard.alt = this._name;
    this._titleCard.textContent = this._name;
    this._renderLike();
    this._renderButtonDel()
    return this._elementCard;
  }

  _likeCard() {
    this._elementCard.querySelector('.elements__button-like').classList.toggle('elements__button-like_checked');
  }

  isLiked() {
    const user = this._userId;
    return this.likes.some(function (userLike) {
      return (userLike._id === user);
    })
  }

  _renderLike() {
    if (this.isLiked()) {
      this._elementCard.querySelector('.elements__button-like').classList.add('elements__button-like_checked');
    };
    this._countLikes.textContent = this.likes.length;
    //console.log(this, this.likes);
  }

  updateLikes(data) {
    this.likes = data.likes;
    this._likeCard();
  }

  _isOwner() {
    return (this._ownerItemId === this._userId);
  }

  _renderButtonDel() {
    if (!this._isOwner()) {
      this._buttonDel.classList.add('elements__button-del_none');
    };
  }

  deleteCard() {
    this._elementCard.innerHTML = '';
    this._elementCard.remove();
  }

  _setEventListeners() {
    if (this._isOwner) {
      this._buttonDel.addEventListener('click', () => { this._handleDelClick(this) });
    };
    this._buttonLike.addEventListener('click', () => { this._handleLikeClick(this) });
    this._elementCard.querySelector('.elements__card-img').addEventListener('click', this._handleCardClick);
  }

}


export default Card;

