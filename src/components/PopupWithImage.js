import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

  }

  open(evt) {
    const imgCard = this._popup.querySelector('.popup__img');
    const nameImgCard = this._popup.querySelector('.popup__img-name')
    imgCard.src = evt.target.src;
    imgCard.alt = evt.target.alt;
    nameImgCard.textContent = evt.target.alt;
    super.setEventListeners();
    this._popup.classList.add('popup_opened');

  }
}
