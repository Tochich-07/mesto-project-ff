import { createCard, initialCards } from "./components/cards.js";
import { closeModal, openModal } from "./components/modal.js";
import './styles/index.css';

const popupImage = document.querySelector(".popup_type_image");
const cardTemplate = document.getElementById("card-template").content;
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");
const buttonPopupOpen = document.querySelector(".profile__edit-button")
const popupProfile = document.querySelector(".popup_type_edit")
const popupAdd = document.querySelector(".popup_type_new-card");
const formNewCard = document.forms.new__place
const btnAddCard = document.querySelector(".profile__add-button");
const formElementProfile = document.querySelector(".popup__form");
const cloneCard = cardTemplate.querySelector(".card").cloneNode(true);
const imageCard = cloneCard.querySelector(".card__image");
const cardsUl = document.querySelector(".places__list");
const inputPlaceHeading = document.querySelector(".popup__input_type_card-name");
const inputPlaceLink = document.querySelector(".popup__input_type_url");

btnAddCard.addEventListener("click", function () {
  openModal(popupAdd);
});

//Закрытие модальных окон
document.querySelectorAll('.popup__close').forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });
})

//Открытие попапа профиля
buttonPopupOpen.addEventListener("click", function () {
  openModal(popupProfile);
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
});

//Функция редактирования профиля
function handlerFormProfile(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closeModal(popupProfile);
}

formElementProfile.addEventListener("submit", handlerFormProfile);

//Функция лайка
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

//Функция удалния карточки
function deleteCard(evt) {
  const item = evt.target.closest(".card");
  item.remove();
}


// Открытие модалки при клике на фото
function openModalImage(data) {
  document.querySelector(".popup__image").src = data.link;
  document.querySelector(".popup__caption").textContent = data.name;
  openModal(popupImage)
};



//Создание карточки
formNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const el = {
    name: inputPlaceHeading.value,
    link: inputPlaceLink.value,
  }

  const card = createCard(el, deleteCard, likeCard, openModalImage)

  cardsUl.prepend(card);

  inputPlaceHeading.value = "";
  inputPlaceLink.value = "";
  closeModal(popupAdd);
});

//Отрисовка карточек
function renderCard() {
  initialCards.forEach(function (el) {
    const card = createCard(el, deleteCard, likeCard, openModalImage)

    cardsUl.prepend(card);
  });
}
renderCard();
