let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button-edit');
let closeButton = popup.querySelector('.popup__button-close-form');
let saveButton = popup.querySelector('.popup__button-save-form');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');


function formClose () {
  popup.classList.remove('popup_opened');
}

function formOpen () {
  popup.classList.add('popup_opened');
  let inputs = popup.querySelectorAll('input');
  inputs[0].value = nameProfile.textContent;
  inputs[1].value = jobProfile.textContent;
}



// Находим форму в DOM
let formElement = document.querySelector('.popup__container');// Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    //let inputs = popup.querySelectorAll('input');
    let nameInput =  formElement.querySelector('.popup__form-input_type_name');
    let jobInput =  formElement.querySelector('.popup__form-input_type_job');

    // Получите значение полей из свойства value
    let name = nameInput.value;
    let job = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    //let nameProfile = document.querySelector('.profile__title');
    //let jobProfile = document.querySelector('.profile__subtitle');
    // Вставьте новые значения с помощью textContent
    nameProfile.textContent = name;
    jobProfile.textContent = job;

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', formOpen);
closeButton.addEventListener('click', formClose);
