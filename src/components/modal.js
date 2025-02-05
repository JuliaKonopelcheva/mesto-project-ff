// @todo: Открытие попапа
export const openPopup = (popup) => {
  popup.classList.add('popup_is-animated');
  document.addEventListener('keydown', closePopupOnEsc);
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, 10);
};

// @todo: Закрытие попапа
export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnEsc);
  setTimeout(() => {
    popup.classList.remove('popup_is-animated');
  }, 600);
};

// @todo: Закрытие попапа по ESC
const closePopupOnEsc = (event) => {
  event.key === 'Escape'
    ? closePopup(document.querySelector('.popup_is-opened'))
    : null;
};
