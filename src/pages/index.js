import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import { configValidate, buttonEditProfile, buttonAddCard, inputName, inputJob, avatarEditButton } from '../components/constants.js';
import PopupYes from '../components/PopupYes';
const ownerUser = { id: "" }; //id пользователя.

//обработчики сабмитов
//обработчик формы добавить карточку
const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  popupAddCard.preLoadingCard(true);
  const inputsCardInfo = popupAddCard.getInputValues();
  api.createPost(inputsCardInfo).then((card) => {
    const newElementCard = renderCardElement(card);
    cardList.addItem(newElementCard);
  })
    .finally(() => {
      popupAddCard.close();
      popupAddCard.preLoadingCard(false);
    });

}

//обработчик формы редактировать профиль - enter или кнопка сохранить
const handleEditProfileFormSubmit = (evt) => {
  evt.preventDefault();
  popupEditProfile.preLoading(true);
  const inputUserInfo = popupEditProfile.getInputValues();
  api.saveUserInfo(inputUserInfo).then((userData) => {
    userInfo.setUserInfo(userData);
  })
    .finally(() => {
      popupEditProfile.close();
      popupEditProfile.preLoading(false);
    });

}

//обработчик формы редактировать аватар
const handleEditAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  popupEditAvatar.preLoading(true);
  const inputsCardInfo = popupEditAvatar.getInputValues();
  api.setNewAvatar(inputsCardInfo).then((userData) => {
    userInfo.deleteAvatar();
    userInfo.setAvatar(userData);

  })
    .finally(() => {
      popupEditAvatar.close();
      popupEditAvatar.preLoading(false);
    });

}

//инициализация классов
const popupEditProfile = new PopupWithForm('.popup_js_editprofile', handleEditProfileFormSubmit);
const userInfo = new UserInfo({ nameSelector: '.profile__title', jobSelector: '.profile__subtitle' }, '#avatar');
const popupWithImage = new PopupWithImage('.popup_js_imgcard');
const popupYes = new PopupYes('.popup_js_yes', /* handleDeleteCardFormSubmit */);
const popupAddCard = new PopupWithForm('.popup_js_addcard', handleAddCardFormSubmit);
const popupEditAvatar = new PopupWithForm('.popup_js_avatar', handleEditAvatarFormSubmit);

//слушатели событий
//кнопка добавить карточку
buttonAddCard.addEventListener('click', function () {
  addForm.disableSubmitButton();
  popupAddCard.open();
});

//кнопка попапа редактировать профиль
buttonEditProfile.addEventListener('click', function () {
  popupEditProfile.open();
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputJob.value = userData.job;
});

//аватар
avatarEditButton.addEventListener('click', function () {
  popupEditAvatar.open();
});


//колбеки которые передаем в экземпляры классов при создании
//колбэк для просмотр карточки - зум
const handleCardClick = (evt) => {
  popupWithImage.open(evt);
}

//лакнуть
function handleLikeClick(card) {
  if (card.isLiked()) {
    api.unlikePost(card.itemId).then((data) => {
      card.updateLikes(data);
    }).then(() => {
      card._countLikes.textContent = card.likes.length;
    });
  } else {
    api.likePost(card.itemId).then((data) => {
      card.updateLikes(data);
    }).then(() => {
      card._countLikes.textContent = card.likes.length;
    });
  }
}

//кнопка удаление на карточке
function handleDelClick(card) {
  popupYes.open();
  document.querySelector('.popup__form_js_yes').addEventListener('submit', (evt) => {
    evt.preventDefault();
    api.deletePost(card.itemId).then((status) => {
      if (status) {
        card.deleteCard();
        popupYes.close();
      };
    });
  });
}

//сборка элемента карточка
const renderCardElement = (item) => {
  const card = new Card(item, '#card', handleCardClick, handleLikeClick, handleDelClick, ownerUser.id);
  const cardElement = card.createCard();
  return cardElement;
};

//работа с данными - инициализация
//включаем валидацию форм в документе
const editForm = new FormValidator(configValidate, '.popup__form_js_editprofile');
editForm.enableValidation();

const addForm = new FormValidator(configValidate, '.popup__form_js_addcard');
addForm.enableValidation();

const avatarForm = new FormValidator(configValidate, '.popup__form_js_avatar');
avatarForm.enableValidation();

//инициализируем класс с запросами к серверу
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: '812995ab-7dea-4621-b929-530b002b0397',
    'Content-Type': 'application/json'
  }
});

//получаем профиль и прописываем на страницу
api.getUserInfo().then((userData) => {
  userInfo.setUserInfo(userData);
  userInfo.setAvatar(userData);
  ownerUser.id = userData._id;
});

const cardList = new Section({
  items: api.getInitialCards().then((dataCards) => dataCards),
  renderer: renderCardElement,
}, '.elements__gallery');

//получение стартового массива карточек
api.getInitialCards().then((dataCards) => {
  cardList.renderItems(dataCards);
});
