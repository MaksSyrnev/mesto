//функции валидации данных в формах

//показать ошибку инпута
const showInputError = (formElement, inputElement, errorMessage, objValid) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);//по ID переданного инпута находим элемент ошибки
  inputElement.classList.add(objValid.inputErrorClass);//добавляем класс невалидного поля - название класса - значение из объекта с настройками валидации
  errorElement.textContent = errorMessage;//присваем текст ошибки, приходит как аргумент в явном виде
  errorElement.classList.add(objValid.errorClass);//показываем ошибку, класс -  значение из объекта настроек валидации
};

//убрать ошибку инпута
const hideInputError = (formElement, inputElement, objValid) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(objValid.inputErrorClass);//убрали класс подсветки невалидного инпута
  errorElement.classList.remove(objValid.errorClass); //убрали видимость текста ошибки
  errorElement.textContent = 'Заполнитель'; // Присвоили содержанию ошибки текст заполнитель. Он уже не виден на странице, но нужен чтоб не схлопнулся блок спан и сохранился дизайн формы в размерах
};

//проверить валидацию инпута. условия заданы в разметке, проверяет браузер с помощью объекта validity
const checkInputValidity = (formElement, inputElement, objValid) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, objValid); //вызов показать ошибку, как аргумент отправляем бразуерное сообщение об ошибке
  } else {
    hideInputError(formElement, inputElement, objValid); //вызвать скрыть ошибку
  }
};

//проверка валидности всей формы - все ли инпуты валидны - возврат Да/нет
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//управляем достпностью кнопки сабмит формы
const toggleButtonState = (inputList, buttonElement, objValid) => {
  if (hasInvalidInput(inputList)) {                                      //используем функцию проверки валидности всей формы
    buttonElement.classList.add(objValid.inactiveButtonClass);          //отключаем кнопку - класс - значение из объекта настроек валидности
  } else {
     buttonElement.classList.remove(objValid.inactiveButtonClass);      //включаем ккнопку
  }
};

//установка обработчиков для формы слушатель на событие ввода
const setEventListeners = (formElement, objValid) => {
  const inputList = Array.from(formElement.querySelectorAll(objValid.inputSelector)); //поиск инпутов в форме на основе значения из обьекта
  const buttonElement= formElement.querySelector(objValid.submitButtonSelector); //поиск кнопки на основе значения из объекта
  toggleButtonState(inputList, buttonElement, objValid); //проверить валидность для кнопки формы при открытии формы
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, objValid); //если происходит ввод проверить валидность
      toggleButtonState(inputList, buttonElement, objValid);  //проверить для кноки формы
    });
  });
};

//включение валидации всех форм
const enableValidation = (objValid) => {
  const formList = Array.from(document.querySelectorAll(objValid.formSelector)); // находим формы
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt)=> {  //отключаем поведение по умолчанию
      evt.preventDefault();
    });
    setEventListeners(formElement, objValid);  //навешиваем обработчики - вызов функции установить обработчик
  });
}

//вызов проверки валидности - входящий объект содержит настройки
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
