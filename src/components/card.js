// @todo: Функция создания карточки
export const addCard = (cardData, deleteCard, handleLikeClick, openImagePopup) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImageElement = cardElement.querySelector('.card__image');
  const cardTitleElement = cardElement.querySelector('.card__title');
  const deleteButtonElement = cardElement.querySelector('.card__delete-button');
  const likeButtonElement = cardElement.querySelector('.card__like-button');

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;

  // Колбеки
  deleteButtonElement.addEventListener('click', () => deleteCard(cardElement)); // Удаление карточки
  likeButtonElement.addEventListener('click', handleLikeClick); // Лайк карточки
  cardImageElement.addEventListener('click', () => openImagePopup(cardData)); // Открытие изображения

  return cardElement;
};

// @todo: Функция удаления карточки
export const deleteCard = (cardElement) => {
  cardElement.remove();
};

// @todo: Функция лайка карточки
export const handleLikeClick = (event) => {
  event.target.classList.toggle('card__like-button_is-active');
};

