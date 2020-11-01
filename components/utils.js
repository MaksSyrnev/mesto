import { popupImgCard, imgCard, nameImgCard } from '../pages/index.js'

//общий функционал
//закрытие попапа через Esc
export const closePopupEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
};

//закрытие по клику на оверлее
export const closePopupClick = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
};

//открыть попап
export function openPopup(popup) {
  document.addEventListener('keyup', closePopupEsc);
  document.addEventListener('click', closePopupClick);
  popup.classList.add('popup_opened');
}

//закрыть попап
export function closePopup(popup) {
  document.removeEventListener('keyup', closePopupEsc);
  document.removeEventListener('click', closePopupClick);
  popup.classList.remove('popup_opened');
}

//обработчики
//просмотр карточки в полный экран imgTarget
export const openImgCard = (evt) => {
  imgCard.src = evt.target.src;
  imgCard.alt = evt.target.alt;
  nameImgCard.textContent = evt.target.alt;
  openPopup(popupImgCard);
}
