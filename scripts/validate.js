//функции валидации данных в формах

//показать ошибку инпута
const showInputError = (formElement, inputElement, errorMessage, objValid) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);    //по ID инпута находим элемент ошибки
  inputElement.classList.add(objValid.inputErrorClass);                           //добавляем класс полю
  errorElement.textContent = errorMessage;                                        //присваем текст ошибки
  errorElement.classList.add(objValid.errorClass);                                //показываем ошибку
};

//убрать ошибку инпута
const hideInputError = (formElement, inputElement, objValid) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);     //по ID инпута находим элемент ошибки
  inputElement.classList.remove(objValid.inputErrorClass);                         //убрали класс подсветки невалидного инпута
  errorElement.classList.remove(objValid.errorClass);                              //убрали видимость ошибки
  errorElement.textContent = 'Заполнитель';                                        //Присвоили содержанию ошибки текст заполнитель.
};                                                                                 //Он не виден, нужен чтоб не схлопнулся спан и сохранился дизайн формы в размерах

//валидация инпута. условия из разметки, проверяет браузер с помощью объекта validity
const checkInputValidity = (formElement, inputElement, objValid) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, objValid);  //вызов показать ошибку,
  } else {                                                                                //как аргумент отправляем бразуерное сообщение об ошибке
    hideInputError(formElement, inputElement, objValid);                                  //вызвать скрыть ошибку
  }
};

//валидность формы - есть невалидные инпуты - возврат Да/нет
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//отключаем кнопку сабмит формы
// const disableSubmitButton = (formElement, objValid) => {
//   const buttonElement= formElement.querySelector(objValid.submitButtonSelector);
//   buttonElement.classList.add(objValid.inactiveButtonClass);
//   buttonElement.setAttribute("disabled", "true");
// };

//доступность кнопки формы сабмит
const toggleButtonState = (inputList, buttonElement, objValid) => {
  if (hasInvalidInput(inputList)) {                                      //используем функцию проверки валидности всей формы
    buttonElement.classList.add(objValid.inactiveButtonClass);          //отключаем кнопку - класс - значение из объекта настроек валидности
    buttonElement.setAttribute("disabled", "true");                     //полностью отключаем через добавление атрибута
    } else {
     buttonElement.classList.remove(objValid.inactiveButtonClass);      //включаем ккнопку
     buttonElement.removeAttribute("disabled");                         //возвращаем возможность нажатия - удаляем атрибут
    }
};

//обработчик для формы - слушатель по событию инпут
const setEventListeners = (formElement, objValid) => {
  const inputList = Array.from(formElement.querySelectorAll(objValid.inputSelector)); //находим все инпуты в форме
  const buttonElement= formElement.querySelector(objValid.submitButtonSelector);      //находим кнопку отправки формы
  toggleButtonState(inputList, buttonElement, objValid);                              //проверить доступность кнопки отправки формы
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {                               //навешиваем обработчики на событие ввода в инпутах формы
      checkInputValidity(formElement, inputElement, objValid);                        //проверить валидность
      toggleButtonState(inputList, buttonElement, objValid);                          //проверить доступность кнопки
    });
  });
};

//включение валидации всех форм
const enableValidation = (objValid) => {
  const formList = Array.from(document.querySelectorAll(objValid.formSelector)); // находим все формы в документе
  formList.forEach((formElement) => {                                            // для каждой  формы
    formElement.addEventListener('submit', (evt)=> {                             // навешиваем обработчик на submit, который
      evt.preventDefault();                                                      // отключает отправку браузером - поведение по умолчанию
      //disableSubmitButton(evt.target, objValid);
      });
  setEventListeners(formElement, objValid);                                      //ставим слушатели на события формы
  });
}

//вызов функции включения валидации по всем формам в документе - входящий объект содержит настройки
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
