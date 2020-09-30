const showInputError = (formElement, inputElement, errorMessage, objValid) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(objValid.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objValid.errorClass);
};

const hideInputError = (formElement, inputElement, objValid) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(objValid.inputErrorClass);
  errorElement.classList.remove(objValid.errorClass);
  errorElement.textContent = 'Заполнитель';
};

const checkInputValidity = (formElement, inputElement, objValid) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, objValid);
  } else {
    hideInputError(formElement, inputElement, objValid);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, objValid) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(objValid.inactiveButtonClass);
  } else {
     buttonElement.classList.remove(objValid.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, objValid) => {
  const inputList = Array.from(formElement.querySelectorAll(objValid.inputSelector));
  const buttonElement= formElement.querySelector(objValid.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, objValid);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, objValid);
      toggleButtonState(inputList, buttonElement, objValid);
    });
  });
};

//включение валидации всех форм
const enableValidation = (objValid) => {
  const formList = Array.from(document.querySelectorAll(objValid.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt)=> {
      evt.preventDefault();
    });
    console.log(formElement);
    setEventListeners(formElement, objValid);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
