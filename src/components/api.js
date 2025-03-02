export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
  headers: {
    authorization: localStorage.getItem('authToken') || '',
    'Content-Type': 'application/json'
  }
};


// Функция для проверки ответа сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Получение информации о пользователе с сервера
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(checkResponse);
};
  
// Получение начальных карточек с сервера
export const getInitialCards = () => {
  const token = localStorage.getItem('authToken') || 'e9c36c88-ea0b-42d7-9bce-1a792a146069'; // Гостевой токен

  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: {
      authorization: token, // Используем токен пользователя или гостевой
      'Content-Type': 'application/json'
    }
  })
  .then(checkResponse);
};


// Редактирование профиля
export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(checkResponse);
};

// Добавление карточки
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(checkResponse);
};

// Поставить лайк
export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(checkResponse);
};

// Убрать лайк
export const dislikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(checkResponse);
};

// Удаление карточки с сервера
export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(checkResponse);
};

// Обновление аватара
export const updateAvatar = (newAvatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatarLink
    })
  })
  .then(checkResponse);
};
