let popup = document.querySelector('.popup'); // получим обьект модальное окно из DOM в переменную
let editButton = document.querySelector('.profile__button-edit'); // кнопку редактирования и ниже другие элементы
let closeButton = popup.querySelector('.popup__button-close-form');
let saveButton = popup.querySelector('.popup__button-save-form');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');
let inputName = popup.querySelector('.popup__form-input_js_username');
let inputJob = popup.querySelector('.popup__form-input_js_job');
let formElement = document.querySelector('.popup__form'); // Находим форму в DOM

const cardTemplate = document.querySelector('#card').content; //находим шаблон картоки на странице
const elementsGallery = document.querySelector('.elements__gallery'); //контейнер для карточек

//массив карточек при первом открытии страницы
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//загрузим карточки из массива
initialCards.forEach(function (item) {
//наполним по шаблону одну карточку данными из первого элемента массива
const cardElement = cardTemplate.cloneNode(true);
cardElement.querySelector('.elements__card-img').src = item.link;
cardElement.querySelector('.elements__card-img').alt = item.name;
cardElement.querySelector('.elements__card-title').textContent = item.name;

//добавляем карточку в контейнер-галлерею для отображания на странице
elementsGallery.append(cardElement);

});

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
    nameProfile.textContent = inputName.value;
    jobProfile.textContent = inputJob.value;
    formClose ();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
//обработчики на кнопку редактировать и закрыть
editButton.addEventListener('click', formOpen);
closeButton.addEventListener('click', formClose);



