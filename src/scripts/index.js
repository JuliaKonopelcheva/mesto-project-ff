import '../pages/index.css';
import { initialCards } from './cards';
import { addCard, deleteCard, handleLikeClick } from '../components/card';
import { openPopup, hidePopup, initPopupCloseEvents } from '../components/modal';
import { enableValidation, clearValidation } from '../components/validation';
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  updateAvatar
} from '../components/api';


// @todo: DOM узлы
let userId;
const cardsListElement = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const formNewPlace = document.querySelector('.popup__form[name="new-place"]');
const formAddCard = document.querySelector('.popup_type_new-card .popup__form');
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__image');

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

// // @todo: Вывести карточки на страницу
// initialCards.forEach((cardData) => {
//   const cardElement = addCard(cardData, deleteCard, handleLikeClick, openImagePopup);
//   cardsListElement.append(cardElement);
// });



// @todo: Открытие попапа редактирования профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');

const openEditPopup = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openPopup(popupEdit);
};

btnEditProfile.addEventListener('click', openEditPopup);

// @todo: Обработчик события submit (сохранение введенных данных на сервер)
const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const aboutValue = jobInput.value;

  evt.submitter.textContent = 'Сохранение...'

  updateUserInfo(nameValue, aboutValue)
  .then((res) => {
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about;
    hidePopup(popupEdit);
  })
  .catch((err) => {
    console.log(`Ошибка при обновлении профиля: ${err}`);
  })
  .finally(() => {
    evt.submitter.textContent = 'Сохранить';
  });
};

formEditProfile.addEventListener('submit', handleEditFormSubmit);




// @todo: Открытие попапа добавления карточки
const openAddCardPopup = () => {
  formAddCard.reset();
  clearValidation(formNewPlace, validationConfig);
  openPopup(popupAddCard);
};

btnAddCard.addEventListener('click', openAddCardPopup);



// @todo: Обработчик события submit (сохранение новой карточки на сервер)
const cardNameInput = formAddCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = formAddCard.querySelector('.popup__input_type_url');

const handleAddCardSubmit = (evt) => {
  evt.preventDefault();

  const nameValue = cardNameInput.value;
  const linkValue = cardLinkInput.value;

  evt.submitter.textContent = 'Сохранение...';

  addNewCard(nameValue, linkValue)
    .then((res) => {
      const newCard = addCard(
        res,
        deleteCard,
        handleLikeClick,
        openImagePopup,
        userId
      );
      cardsListElement.prepend(newCard);

      formAddCard.reset();
      hidePopup(popupAddCard);
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении карточки: ${err}`);
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    });
};

formAddCard.addEventListener('submit', handleAddCardSubmit);

// @todo: Открытие попапа обновления аватара
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const formEditAvatar = popupEditAvatar.querySelector('.popup__form');
const avatarInput = formEditAvatar.querySelector('.popup__input_type_avatar-link');

profileAvatar.addEventListener('click', () => {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
  openPopup(popupEditAvatar);
});

// @todo: Обработчик события submit (сохранение нового аватара)
formEditAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const newAvatarLink = avatarInput.value;

  evt.submitter.textContent = 'Сохранение...';

  updateAvatar(newAvatarLink)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url('${res.avatar}')`;
      hidePopup(popupEditAvatar);
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    });
});





// @todo: Закрытие попапов
initPopupCloseEvents();



// Объект с настройками валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Включение валидации для всех форм
enableValidation(validationConfig);






Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {

    userId = userData._id;

    // Добавление данных пользователя в профиль
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;

    // Перебор массива карточек с сервера и добавление в DOM
    cards.forEach((cardData) => {
      const cardElement = addCard(
        cardData,           // данные карточки { name, link, _id, owner, ... }
        deleteCard,         // функция удаления (из card.js)
        handleLikeClick,    // функция лайка (из card.js)
        openImagePopup,      // функция для клика по картинке (из index.js)
        userId
      );
      cardsListElement.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(`Ошибка при загрузке начальных данных: ${err}`);
  });













































