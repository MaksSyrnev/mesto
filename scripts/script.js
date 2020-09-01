let popup = document.querySelector('.popup'); // получим обьект модальное окно из DOM в переменную
let editButton = document.querySelector('.profile__button-edit'); // кнопку редактирования и ниже другие элементы
let closeButton = popup.querySelector('.popup__button-close-form');
let saveButton = popup.querySelector('.popup__button-save-form');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');
let inputName = popup.querySelector('.js-popup__username');
let inputJob = popup.querySelector('.js-popup__job');
let formElement = document.querySelector('.popup__form'); // Находим форму в DOM

//задекларируем функцию закрытия окна
function formClose () {
  popup.classList.remove('popup_opened');
}

//функция открытия
function formOpen () {
  popup.classList.add('popup_opened');
  inputName.value = nameProfile.textContent; //подставляем значения из профиля в форму
  inputJob.value = jobProfile.textContent;
}


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let inputs = popup.querySelectorAll('input');
    // Получите значение полей из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    nameProfile.textContent = inputName.value;
    jobProfile.textContent = inputJob.value;
    formClose ();
    //popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
//обработчики на кнопку редактировать и закрыть
editButton.addEventListener('click', formOpen);
closeButton.addEventListener('click', formClose);
