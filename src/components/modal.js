// @todo: Открытие попапа
export const openPopup = (popup) => {
  popup.classList.add('popup_is-animated');
  document.addEventListener('keydown', closePopupOnEsc);
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, 10);
};

// @todo: Закрытие попапа
export const hidePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnEsc);
  setTimeout(() => {
    popup.classList.remove('popup_is-animated');
  }, 600);
};

// @todo: Закрытие попапа через ESC
const closePopupOnEsc = (event) => {
  event.key === 'Escape'
    ? hidePopup(document.querySelector('.popup_is-opened'))
    : null;
};

// @todo: Закрытие попапов
export const initPopupCloseEvents = () => {
  const popupCloseButtons = document.querySelectorAll('.popup__close');
  popupCloseButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      hidePopup(event.target.closest('.popup'));
    });
  });

  document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('click', (event) => {
      event.target === popup 
      ? hidePopup(popup) 
      : null;
    });
  });
};
