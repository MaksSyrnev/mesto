import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = this._popup.querySelectorAll('.popup__input');  //нашли все поля ввода

  }

  _getInputValues() {  //собирает данные всех полей формы
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });  //записываем значения полей, в качестве имени свойства обьекта берем значение свойства name инпута из разметки
    return formValues;
  }

  setEventListeners() {  //должен добавлять обработчик клика иконке закрытия и добавлять обработчик сабмита формы.
    super.setEventListeners();
    this._formElement = this._popup.querySelector('.popup__form');
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputsData = this._getInputValues();
      this._handleSubmitForm(inputsData);
    });
  }

  _clear() {
    this._inputList = this._popup.querySelectorAll('.popup__input');  //нашли все поля ввода
    this._inputList.forEach(input => input.value = '');
  }

  close() {  //Перезаписывает родительский метод - при закрытии попапа форма должна ещё и сбрасываться.
    this._formElement.reset();
    this._clear();
    super.close();
  }

}
