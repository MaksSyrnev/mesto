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

  _showInputError(formElement, inputElement, errorMessage, objValid) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);    //по ID инпута находим элемент ошибки
    inputElement.classList.add(objValid.inputErrorClass);                           //добавляем класс полю
    errorElement.textContent = errorMessage;                                        //присваем текст ошибки
    errorElement.classList.add(objValid.errorClass);                                //показываем ошибку
  };

  //убрать ошибку инпута
  _hideInputError(formElement, inputElement, objValid) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);     //по ID инпута находим элемент ошибки
    inputElement.classList.remove(objValid.inputErrorClass);                         //убрали класс подсветки невалидного инпута
    errorElement.classList.remove(objValid.errorClass);                              //убрали видимость ошибки
    errorElement.textContent = 'Заполнитель';                                        //Присвоили содержанию ошибки текст заполнитель.
  };                                                                                 //Он не виден, нужен чтоб не схлопнулся спан и сохранился дизайн формы в размерах

  //валидация инпута. условия из разметки, проверяет браузер с помощью объекта validity
  _checkInputValidity(formElement, inputElement, objValid) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, objValid);  //вызов показать ошибку,
    } else {                                                                                //как аргумент отправляем бразуерное сообщение об ошибке
      hideInputError(formElement, inputElement, objValid);                                  //вызвать скрыть ошибку
    }
  };

  //валидность формы - есть невалидные инпуты - возврат Да/нет
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  //Выкл кнопку сабмит формы
  _disableSubmitButton(formElement, objValid) {
    const buttonElement = formElement.querySelector(objValid.submitButtonSelector);
    buttonElement.classList.add(objValid.inactiveButtonClass);                      //добросили класс
    buttonElement.setAttribute("disabled", "true");                                //полностью отключаем через добавление атрибута
  };

  //Вкл кнопку
  _ableSubmitButton(formElement, objValid) {
    const buttonElement = formElement.querySelector(objValid.submitButtonSelector);
    buttonElement.classList.remove(objValid.inactiveButtonClass);                   //убрали класс
    buttonElement.removeAttribute("disabled");                                      //убрали атрибут
  };

  //переключатель доступности кнопки формы сабмит
  _toggleButtonState(inputList, formElement) {
    if (hasInvalidInput(inputList)) {                                                 //используем функцию проверки валидности всей формы
      disableSubmitButton(formElement, objValid);
    } else {
      ableSubmitButton(formElement, objValid);
    }
  };

  //обработчик для формы - слушатель по событию инпут
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this._toggleButtonState(inputList, formElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, formElement);
      });
    });
  };

  //включение валидации всех форм
  enableValidation() {
    const formElement = document.querySelectorAll(this._formId);
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._disableSubmitButton(evt.target);
    });
    this._setEventListeners(formElement);
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
