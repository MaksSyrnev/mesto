export function preLoading(isLoading, popupSelector, text) {
  const buttonSave = document.querySelector(`${popupSelector}`).querySelector('.popup__button');
  const startTextButton = text;
  // console.log(startTextButton);
  if (isLoading) {
    buttonSave.textContent = 'Сохранение...';
    buttonSave.classList.add('popup__button_saving');
    buttonSave.classList.remove('popup__button_disabled');
  } else {
    buttonSave.textContent = startTextButton;
    buttonSave.classList.remove('popup__button_saving');
    buttonSave.classList.add('popup__button_disabled');
  }
}
