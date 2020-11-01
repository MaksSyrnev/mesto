class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();

    }

  }

  open() {
    this.setEventListeners();
    this._popup.classList.add('popup_opened');

  }

  close() {
    document.removeEventListener('keyup', (evt) => {
      this._handleEscClose(evt);
    });
    this._popup.classList.remove('popup_opened');

  }

  setEventListeners() {
    this._popup.querySelector('.popup__button-close-form').addEventListener('click', () => this.close());
    document.addEventListener('keyup', (evt) => {
      this._handleEscClose(evt);
    });


  }


}

export default Popup;
