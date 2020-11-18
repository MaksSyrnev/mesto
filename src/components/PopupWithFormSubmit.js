import Popup from './Popup.js';

export default class PopupWithFormSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    //this._form = this._popup.querySelector('.popup__form');
  }

  setSubmitAction(card, { submitHandler }) {//устанавливает обработчик на событие submit
    this._submitHandler = submitHandler;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement = this._popup.querySelector('.popup__form_js_yes');
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._card);
    });
  }

}
