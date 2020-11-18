import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgCard = this._popup.querySelector('.popup__img');
    this._nameImgCard = this._popup.querySelector('.popup__img-name')
  }

  open({ link, name }) {

    this._imgCard.src = link;
    this._imgCard.alt = name;
    this._nameImgCard.textContent = name;
    super.open();
  }

}
