class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClosePopup = this._popup.querySelector('.popup__button-close-form');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
    this.close = this.close.bind(this);

  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }

  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }

  }

  open() {
    //this.setEventListeners();
    document.addEventListener('keyup', this._handleEscClose);
    this._popup.classList.add('popup_opened');

  }

  close() {
    document.removeEventListener('keyup', this._handleEscClose);
    //document.removeEventListener('click', this._handleClickClose);
    // this._buttonClosePopup.removeEventListener('click', this.close);
    this._popup.classList.remove('popup_opened');

  }

  setEventListeners() {
    this._buttonClosePopup.addEventListener('click', this.close);
    document.addEventListener('click', this._handleClickClose);
    //document.addEventListener('keyup', this._handleEscClose);

  }


}

export default Popup;
