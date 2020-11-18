import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithFormSubmit from '../components/PopupWithFormSubmit';

import { configValidate, buttonEditProfile, buttonAddCard, inputName, inputJob, avatarEditButton } from '../components/constants.js';
import { preLoading } from '../components/utils.js';

const ownerUser = { id: "" }; //id пользователя.

// const popup = new Popup('.popup');
// popup.setEventListeners();

//обработчики сабмитов
//обработчик формы добавить карточку
function handleAddCardFormSubmit(dataCard) {
  preLoading(true, ".popup_js_addcard", "Создать");
  api.createPost(dataCard).then((card) => {
    const newElementCard = renderCardElement(card);
    cardList.addItem(newElementCard);
  }).then(() => {
    popupAddCard.close();
  })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      preLoading(false, ".popup_js_addcard", "Создать");
    });

}

//обработчик формы редактировать профиль - enter или кнопка сохранить
function handleEditProfileFormSubmit(dataCard) {
  preLoading(true, ".popup_js_editprofile", "Сохранить");
  api.saveUserInfo(dataCard).then((userData) => {
    userInfo.setUserInfo(userData);
  }).then(() => {
    popupEditProfile.close();
  })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      preLoading(false, ".popup_js_editprofile", "Сохранить");
    });

}

//обработчик формы редактировать аватар
const handleEditAvatarFormSubmit = (dataCard) => {
  preLoading(true, ".popup_js_avatar", "Сохранить");
  api.setNewAvatar(dataCard).then((userData) => {
    userInfo.setAvatar(userData);
  }).then(() => {
    popupEditAvatar.close();
  })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      preLoading(false, ".popup_js_avatar", "Сохранить");
    });

}

//инициализация классов
const popupEditProfile = new PopupWithForm('.popup_js_editprofile', handleEditProfileFormSubmit);
popupEditProfile.setEventListeners();
const userInfo = new UserInfo({ nameSelector: '.profile__title', jobSelector: '.profile__subtitle' }, '.profile__avatar');
const popupWithImage = new PopupWithImage('.popup_js_imgcard');
popupWithImage.setEventListeners();
const popupWithFormSubmit = new PopupWithFormSubmit('.popup_js_yes');
popupWithFormSubmit.setEventListeners();
const popupAddCard = new PopupWithForm('.popup_js_addcard', handleAddCardFormSubmit);
popupAddCard.setEventListeners();
const popupEditAvatar = new PopupWithForm('.popup_js_avatar', handleEditAvatarFormSubmit);
popupEditAvatar.setEventListeners();

//слушатели событий
//кнопка добавить карточку
buttonAddCard.addEventListener('click', () => {
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
  const link = evt.target.src;
  const name = evt.target.alt;
  popupWithImage.open({ link, name });
}

//лакнуть
function handleLikeClick(card) {
  if (card.isLiked()) {
    api.unlikePost(card.itemId).then((data) => {
      card.updateLikes(data);
      // console.log(data);
      return card.likes;
    }).then(() => {
      card.countLikes();
    }).catch((error) => {
      console.log(error);
    });
  } else {
    api.likePost(card.itemId).then((data) => {
      card.updateLikes(data);
    }).then(() => {
      card.countLikes();
    }).catch((error) => {
      console.log(error);
    });
  }
}

//кнопка удаление на карточке
function handleDelClick(card) {
  popupWithFormSubmit.open();
  popupWithFormSubmit.setSubmitAction(card, {
    submitHandler: (card) => {
      api.deletePost(card.itemId).then((status) => {
        if (status) {
          card.deleteCard();
        };
      }).then(() => {
        popupWithFormSubmit.close();
      })
        .catch((error) => {
          console.log(error);
        })
    }
  });
}

//сборка элемента карточка
const renderCardElement = (item) => {
  const card = new Card(item, '#card', handleCardClick, handleLikeClick, handleDelClick, ownerUser.id);
  const cardElement = card.createCard();
  return cardElement;
};

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

//инициализируем классы которые работают с разметкой
const cardList = new Section({
  items: '', /* api.getInitialCards().then((dataCards) => dataCards).catch((error) => { console.log(error); }), */
  renderer: renderCardElement,
}, '.elements__gallery');

//получаем данные по пользователю и карточки и отрисовываем их
Promise.all([
  api.getInitialCards(),
  api.getUserInfo()
]).then((values) => {
  const initialCards = values[0];
  const userData = values[1];
  ownerUser.id = userData._id;
  userInfo.setUserInfo(userData);
  userInfo.setAvatar(userData);
  cardList.renderItems(initialCards);
}).catch((err) => {
  console.log(err);
});

/*
api.getUserInfo().then((userData) => {
  userInfo.setUserInfo(userData);
  userInfo.setAvatar(userData);
  ownerUser.id = userData._id;
}).catch((error) => {
  console.log(error);
});

const cardList = new Section({
  items: api.getInitialCards().then((dataCards) => dataCards).catch((error) => { console.log(error); }),
  renderer: renderCardElement,
}, '.elements__gallery');

//получение стартового массива карточек
api.getInitialCards().then((dataCards) => {
  cardList.renderItems(dataCards);
}).catch((error) => {
  console.log(error);
});
*/



