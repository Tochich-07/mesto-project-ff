import { createCard, renderCard } from "./components/cards.js";
import { popupClose, popupOpen } from "./components/modal.js";
import './styles/index.css';

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");
const openBtnPop = document.querySelector(".profile__edit-button")
const popupProfile = document.querySelector(".popup_type_edit")
const popupImage = document.querySelector(".popup_type_image");
const popupAdd = document.querySelector(".popup_type_new-card");
const closeProfileBtn = document.querySelector(".popup__close")
const closeBtnPop = document.getElementById("popup__close-id");
const closeImagePop = document.getElementById("popup-iamge__close-id");
const btnAddCard = document.querySelector(".profile__add-button");
const formElement = document.querySelector(".popup__form");

btnAddCard.addEventListener("click", function () {
  popupOpen(popupAdd);
});

closeBtnPop.addEventListener("click", function () {
  popupClose(popupAdd);
});

closeImagePop.addEventListener("click", function () {
  popupClose(popupImage);
});

closeProfileBtn.addEventListener("click", function () {
  popupClose(popupProfile);
});

//Открытие попапа профиля
openBtnPop.addEventListener("click", function () {
  popupOpen(popupProfile);
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
});

//Закрытие по Оверлею
popupProfile.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    popupClose(popupProfile)
  }
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    popupClose(popup);
  }
})

//Закрытие по клавише
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    popupClose(popup);
  }
}

document.addEventListener('keydown', closePopupEsc);

//Функция редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  popupClose(popupProfile);
}

formElement.addEventListener("submit", handleFormSubmit);

//Создание карточки
popupAdd.addEventListener("submit", createCard);
renderCard();

