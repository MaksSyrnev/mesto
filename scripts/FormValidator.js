class FormValidator {
  constructor(configValidate, formId) {
    this._formSelector = configValidate.formSelector;
    this._inputSelector = configValidate.inputSelector;
    this._submitButtonSelector = configValidate.submitButtonSelector;
    this._inactiveButtonClass = configValidate.inactiveButtonClass;
    this._inputErrorClass = configValidate.inputErrorClass;
    this._errorClass = configValidate.errorClass;
    this._formId = formId;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);    //по ID инпута находим элемент ошибки
    inputElement.classList.add(this._inputErrorClass);                           //добавляем класс полю
    errorElement.textContent = errorMessage;                                        //присваем текст ошибки
    errorElement.classList.add(this._errorClass);                                //показываем ошибку
  };

  //убрать ошибку инпута
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);     //по ID инпута находим элемент ошибки
    inputElement.classList.remove(this._inputErrorClass);                         //убрали класс подсветки невалидного инпута
    errorElement.classList.remove(this._errorClass);                              //убрали видимость ошибки
    errorElement.textContent = 'Заполнитель';                                        //Присвоили содержанию ошибки текст заполнитель.
  };                                                                                 //Он не виден, нужен чтоб не схлопнулся спан и сохранился дизайн формы в размерах

  //валидация инпута. условия из разметки, проверяет браузер с помощью объекта validity
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(inputElement, inputElement.validationMessage);  //вызов показать ошибку,
    } else {                                                                                //как аргумент отправляем бразуерное сообщение об ошибке
      hideInputError(inputElement);                                  //вызвать скрыть ошибку
    }
  };

  //валидность формы - есть невалидные инпуты - возврат Да/нет
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  //Выкл кнопку сабмит формы
  _disableSubmitButton() {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    buttonElement.classList.add(this._inactiveButtonClass);                      //добросили класс
    buttonElement.setAttribute("disabled", "true");                                //полностью отключаем через добавление атрибута
  };

  //Вкл кнопку
  _ableSubmitButton() {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  };

  //переключатель доступности кнопки формы сабмит
  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._disableSubmitButton(this._formElement);
    } else {
      this._ableSubmitButton(this._formElement);
    }
  };

  //обработчик для формы - слушатель по событию инпут
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._toggleButtonState(inputList, this._formElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        //this._toggleButtonState(inputList);
      });
    });
  };

  //включение валидации всех форм
  enableValidation() {
    this._formElement = document
      .querySelector(this._formId);
    this._formElement.addEventListener('submit', () => {
      evt.preventDefault();
      this._disableSubmitButton();
    });
    //this._setEventListeners(this._formElement);
  }

}

export default FormValidator;

//настройки валидации по всем формам в документе
// const configValidate = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// };
