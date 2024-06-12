import { createCard, renderCard } from "./components/cards.js";
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
const btnAddCard = document.querySelector(".profile__add-button");
const formElementProfile = document.querySelector(".popup__form");
let cloneCard = cardTemplate.querySelector(".card").cloneNode(true);
const imageCard = cloneCard.querySelector(".card__image");

//Открытие модалки при клике на фото
export function openModalImage() {
  imageCard.addEventListener("click", function () {
    openModal(popupImage);
    let imagePopup = document.querySelector(".popup__image").src = el.link.toString();
    let imageCaption = document.querySelector(".popup__caption").textContent = el.name.toString();
  });
}

btnAddCard.addEventListener("click", function () {
  openModal(popupAdd);
});

document.querySelectorAll('.popup__close').forEach(button => {
  const buttonsPopup = button.closest('.popup'); // нашли родителя с нужным классом
  button.addEventListener('click', () => closeModal(buttonsPopup)); // закрыли попап
});


//Открытие попапа профиля
buttonPopupOpen.addEventListener("click", function () {
  openModal(popupProfile);
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
});

// Закрытие по Оверлею
popupProfile.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closeModal(popupProfile)
  }
})

popupAdd.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closeModal(popupAdd)
  }
})

popupImage.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closeModal(popupImage)
  }
})

// function closePopupOverlay(evt) {
//   if (evt.currentTarget === evt.target) {
//     closeModal(evt)
// }
// }


//Функция редактирования профиля
function handlerFormProfile(evt) {
  evt.preventDefault();
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closeModal(popupProfile);
}

formElementProfile.addEventListener("submit", handlerFormProfile);

//Создание карточки
popupAdd.addEventListener("submit", createCard);
renderCard();

