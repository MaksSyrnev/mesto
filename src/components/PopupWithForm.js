import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  getInputValues() {  //собирает данные всех полей формы
    this._inputList = this._popup.querySelectorAll('.popup__input');  //нашли все поля ввода
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });  //записываем значения полей, в качестве имени свойства обьекта берем значение свойства name инпута из разметки
    return formValues;
  }

  setEventListeners() {  //должен добавлять обработчик клика иконке закрытия и добавлять обработчик сабмита формы.
    super.setEventListeners();
    this._formElement = this._popup.querySelector('.popup__form');
    this._formElement.addEventListener('submit', this._handleSubmitForm);
  }

  close() {  //Перезаписывает родительский метод - при закрытии попапа форма должна ещё и сбрасываться.
    this._formElement.reset();
    super.close();

  }

  preLoading(isLoading) {
    this._buttonSave = this._popup.querySelector('.popup__button');
    if (isLoading) {
      this._buttonSave.textContent = 'Сохранение...';
      this._buttonSave.classList.add('popup__button_saving');
      this._buttonSave.classList.remove('popup__button_disabled');
    } else {
      this._buttonSave.textContent = 'Сохранить';
      this._buttonSave.classList.remove('popup__button_saving');
      this._buttonSave.classList.add('popup__button_disabled');
    }
  }

  preLoadingCard(isLoading) {
    this._buttonSave = this._popup.querySelector('.popup__button');
    if (isLoading) {
      this._buttonSave.textContent = 'Сохранение...';
      this._buttonSave.classList.add('popup__button_saving');
      this._buttonSave.classList.remove('popup__button_disabled');
    } else {
      this._buttonSave.textContent = 'Создать';
      this._buttonSave.classList.remove('popup__button_saving');
      this._buttonSave.classList.add('popup__button_disabled');
    }
  }

}
