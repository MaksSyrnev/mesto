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

  //показать ошибку по инпуту
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  //убрать ошибку инпута
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = 'Заполнитель';
  };

  //валидация инпута. используем validity
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //невалидные инпуты - возврат Да/нет
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  //Выкл кнопку сабмит формы
  _disableSubmitButton() {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute("disabled", "true");
  };

  //Вкл кнопку
  _ableSubmitButton() {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  };

  //переключатель доступности кнопки формы сабмит
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableSubmitButton(this._formElement);
    } else {
      this._ableSubmitButton(this._formElement);
    }
  };

  //обработчик для формы - слушатель по событию инпут
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  //включение валидации всех форм
  enableValidation() {
    this._formElement = document.querySelector(this._formId);
    this._disableSubmitButton();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._disableSubmitButton();
    });
    this._setEventListeners();
  }

}

export default FormValidator;
