import '../pages/index.css';
import { initialCards } from './cards';
import { addCard, deleteCard, handleLikeClick } from '../components/card';
import { openPopup, closePopup } from '../components/modal';
import logo from '../images/logo.svg';
import avatar from '../images/avatar.jpg';

// @todo: Установка изображений логотипа и аватара
document.querySelector('.header__logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

// @todo: DOM узлы
const cardsListElement = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const formAddCard = popupAddCard.querySelector('.popup__form');
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = addCard(cardData, deleteCard, handleLikeClick, openImagePopup);
  cardsListElement.append(cardElement);
});

// @todo: Открытие попапа редактирования профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// @todo: Внесение в форму данных со страницы
const openEditPopup = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
};

btnEditProfile.addEventListener('click', openEditPopup);

// @todo: Обработчик события submit (сохранение введенных данных)
const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
};

formElement.addEventListener('submit', handleEditFormSubmit);

// @todo: Попап с изображением
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

// @todo: Открытие попапа с изображением
const openImagePopup = (cardData) => {
  popupImageElement.src = cardData.link;
  popupImageElement.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(popupImage);
};

// @todo: Открытие попапа добавления карточки
const openAddCardPopup = () => {
  openPopup(popupAddCard);
};

btnAddCard.addEventListener('click', openAddCardPopup);

// @todo: Обработчик события submit (сохранение новой карточки)
const cardNameInput = formAddCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = formAddCard.querySelector('.popup__input_type_url');

const handleAddCardSubmit = (evt) => {
  evt.preventDefault();

  const newCard = addCard(
    { name: cardNameInput.value, link: cardLinkInput.value },
    deleteCard,
    handleLikeClick,
    openImagePopup
  );

  cardsListElement.prepend(newCard);
  closePopup(popupAddCard);
};

formAddCard.addEventListener('submit', handleAddCardSubmit);

// @todo: Закрытие попапов
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'));
  });
});

document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (event) => {
    event.target === popup ? closePopup(popup) : null;
  });
});

