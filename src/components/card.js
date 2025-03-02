import { likeCard, dislikeCard, deleteCardFromServer } from './api';

// @todo: Функция создания карточки
export const addCard = (
    cardData, 
    deleteCard, 
    handleLikeClick, 
    openImagePopup,
    openConfirmDeletePopup,
    userId) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImageElement = cardElement.querySelector('.card__image');
  const cardTitleElement = cardElement.querySelector('.card__title');
  const deleteButtonElement = cardElement.querySelector('.card__delete-button');
  const likeButtonElement = cardElement.querySelector('.card__like-button');
  const likeCountElement = cardElement.querySelector('.card__like-count');

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;

  // Количество лайков с сервера
  likeCountElement.textContent = cardData.likes.length;

  // Проверяю по id стоит ли лайк с этого id
  if (cardData.likes.some((likeObj) => likeObj._id === userId)) {
    likeButtonElement.classList.add('card__like-button_is-active');
  }

  likeButtonElement.addEventListener('click', () => {
    handleLikeClick(cardData, likeButtonElement, likeCountElement);
  });

  // Отключаю кнопку лайка, если пользователь не авторизован
  if (!userId) {
    likeButtonElement.style.pointerEvents = 'none'; // Отключаем клики
    likeButtonElement.style.opacity = '0.5'; // Делаем визуально неактивной
  } else {
    likeButtonElement.addEventListener('click', () => {
      handleLikeClick(cardData, likeButtonElement, likeCountElement);
    });
  }



  // Скрываю корзину, если карточка добавлена не текущим пользователем
  if (cardData.owner._id !== userId) {
    deleteButtonElement.style.display = 'none';
  } 

  // Удаление карточки
  deleteButtonElement.addEventListener('click', () => {
    openConfirmDeletePopup(cardElement, cardData._id);
  });
  
  

  cardImageElement.addEventListener('click', () => openImagePopup(cardData));

  return cardElement;
};


// @todo: Функция удаления карточки
export const deleteCard = (cardElement) => {
  cardElement.remove();
};

// @todo: Функция лайка карточки
export const handleLikeClick = (cardData, likeButtonElement, likeCountElement) => {
  const isLiked = likeButtonElement.classList.contains('card__like-button_is-active');

  if (!isLiked) {
    likeCard(cardData._id)
      .then((updatedCard) => {
        cardData.likes = updatedCard.likes;
        likeButtonElement.classList.add('card__like-button_is-active');
        likeCountElement.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log(`Ошибка при лайке: ${err}`));
  } else {
    dislikeCard(cardData._id)
      .then((updatedCard) => {
        cardData.likes = updatedCard.likes;
        likeButtonElement.classList.remove('card__like-button_is-active');
        likeCountElement.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log(`Ошибка при дизлайке: ${err}`));
  }
};
