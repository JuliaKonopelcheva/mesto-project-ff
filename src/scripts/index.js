import '../pages/index.css';
import { initialCards } from './cards';
import { addCard, deleteCard, handleLikeClick } from '../components/card';
import { openPopup, hidePopup, openImagePopup, openAddCardPopup, initPopupCloseEvents } from '../components/modal';
import logo from '../images/logo.svg';
import avatar from '../images/avatar.jpg';

// @todo: Установка изображений логотипа и аватара
document.querySelector('.header__logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

// @todo: DOM узлы
const cardsListElement = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const formAddCard = document.querySelector('.popup_type_new-card .popup__form');
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');

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
  hidePopup(popupEdit);
};

formElement.addEventListener('submit', handleEditFormSubmit);




// @todo: Открытие попапа добавления карточки
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
  hidePopup(document.querySelector('.popup_type_new-card'));
};

formAddCard.addEventListener('submit', handleAddCardSubmit);



// @todo: Закрытие попапов
initPopupCloseEvents();
