// @todo: Открытие попапа
export const openPopup = (popup) => {
  popup.classList.add('popup_is-animated');
  document.addEventListener('keydown', closePopupOnEsc);
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, 10);
};



// @todo: Открытие попапа с изображением
export const openImagePopup = (cardData) => {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaption = popupImage.querySelector('.popup__caption');

  popupImageElement.src = cardData.link;
  popupImageElement.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(popupImage);
};


// @todo: Открытие попапа добавления карточки
export const openAddCardPopup = () => {
  const popupAddCard = document.querySelector('.popup_type_new-card');
  openPopup(popupAddCard);
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
