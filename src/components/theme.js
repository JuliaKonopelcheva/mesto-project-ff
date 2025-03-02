import sunIcon from '../images/sun_line_icon_235554.svg';
import moonIcon from '../images/iconizer-sun_line_icon_235554.svg';

import addDark from '../images/add-icon.svg';
import addLight from '../images/iconizer-add-icon.svg';

import authDark from '../images/log_out_icon_light.svg';
import authLight from '../images/iconizer-entrance_icon.svg';

import editDark from '../images/edit-icon.svg';
import editLight from '../images/iconizer-edit-icon.svg';

import logoutDark from '../images/entrance_icon.svg';
import logoutLight from '../images/iconizer-log_out_icon.svg';

import logoDark from '../images/logo.svg';
import logoLight from '../images/iconizer-logo.svg';

// @todo: DOM узлы
const themeToggleButton = document.querySelector('.theme-toggle');
const themeIcon = themeToggleButton?.querySelector('.theme-toggle__icon');
const logo = document.querySelector('.logo'); // Логотип

const logoutButton = document.querySelector('.cohort__logout-button');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const authButton = document.querySelector('.cohort__auth-button');

// Функция обновления иконок, обводки и логотипа
const updateThemeStyles = (isLightTheme) => {
  // Меняем иконки
  if (logoutButton) logoutButton.style.backgroundImage = `url(${isLightTheme ? logoutLight : logoutDark})`;
  if (editProfileButton) editProfileButton.style.backgroundImage = `url(${isLightTheme ? editLight : editDark})`;
  if (addCardButton) addCardButton.style.backgroundImage = `url(${isLightTheme ? addLight : addDark})`;
  if (authButton) authButton.style.backgroundImage = `url(${isLightTheme ? authLight : authDark})`;

  // Меняем логотип
  if (logo) logo.src = isLightTheme ? logoLight : logoDark;

  // Меняем обводку (border)
  const borderColor = isLightTheme ? '#000' : '#fff';
  if (logoutButton) logoutButton.style.borderColor = borderColor;
  if (editProfileButton) editProfileButton.style.borderColor = borderColor;
  if (addCardButton) addCardButton.style.borderColor = borderColor;
  if (authButton) authButton.style.borderColor = borderColor;
  if (themeToggleButton) themeToggleButton.style.borderColor = borderColor;
};

// Функция переключения темы
const toggleTheme = () => {
  const isLightTheme = document.body.classList.toggle('light-theme');
  document.body.classList.toggle('dark-theme', !isLightTheme);

  if (themeIcon) themeIcon.src = isLightTheme ? sunIcon : moonIcon;
  updateThemeStyles(isLightTheme);

  // Сохраняем тему в localStorage
  localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
};

// Проверяем тему при загрузке страницы
const savedTheme = localStorage.getItem('theme') || 'dark';
const isLightTheme = savedTheme === 'light';

document.body.classList.toggle('light-theme', isLightTheme);
document.body.classList.toggle('dark-theme', !isLightTheme);

if (themeIcon) themeIcon.src = isLightTheme ? sunIcon : moonIcon;
updateThemeStyles(isLightTheme);

// Добавляем обработчик клика
if (themeToggleButton) {
  themeToggleButton.addEventListener('click', toggleTheme);
}