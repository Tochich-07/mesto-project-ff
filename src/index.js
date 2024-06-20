import { initialCards } from "./components/cards.js";
import { createCard, likeCard, deleteCard } from "./components/card.js";
import { closeModal, openModal } from "./components/modal.js";
import './styles/index.css';

const popupTypeImage = document.querySelector(".popup_type_image");
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
const cardsUl = document.querySelector(".places__list");
const inputPlaceHeading = document.querySelector(".popup__input_type_card-name");
const inputPlaceLink = document.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup__image")
const popupCaption =  document.querySelector(".popup__caption")

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

// Открытие модалки при клике на фото
function openModalImage(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;
  
  openModal(popupTypeImage)
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
