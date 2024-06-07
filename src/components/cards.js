import {popupOpen, popupClose } from "./modal.js";

const arkhyzImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chelyabinskImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovoImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url)
const kamchatkaImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url)
const kholmogorsky = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url)
const baikalImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url)

const cardTemplate = document.getElementById("card-template").content;
const inputPlaceHeading = document.querySelector(".popup__input_type_card-name");
const inputPlaceLink = document.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup_type_image");
let cloneCard = cardTemplate.querySelector(".card").cloneNode(true);
const cardsUl = document.querySelector(".places__list");
let cardName = cloneCard.querySelector(".card__title").textContent;
let cardLink = cloneCard.querySelector(".card__image").src;
const popupAdd = document.querySelector(".popup_type_new-card");

const initialCards = [
    {
      name: "Архыз",
      link: arkhyzImage,
    },
    {
      name: "Челябинская область",
      link: chelyabinskImage,
    },
    {
      name: "Иваново",
      link: ivanovoImage,
    },
    {
      name: "Камчатка",
      link: kamchatkaImage,
    },
    {
      name: "Холмогорский район",
      link: kholmogorsky,
    },
    {
      name: "Байкал",
      link: baikalImage,
    }
];

export function createCard(evt) {
  evt.preventDefault();
  cloneCard = cardTemplate.querySelector(".card").cloneNode(true);

  cardName = inputPlaceHeading.value;
  cardLink = inputPlaceLink.value;

  cloneCard.querySelector(".card__image").src = cardLink;
  cloneCard.querySelector(".card__title").textContent = cardName;
  cardsUl.prepend(cloneCard);
  inputPlaceHeading.value = "";
  inputPlaceLink.value = "";
  popupClose(popupAdd);

  cloneCard.querySelector(".card__like-button").addEventListener("click", (e) => {
      e.target.classList.toggle("card__like-button_is-active");
    });

  cloneCard.querySelector(".card__delete-button").addEventListener("click", (e) => {
      let item = e.target.closest(".card");
      item.remove();
    });
}

//Отрисовка карточек
export function renderCard() {
  initialCards.forEach(function (el) {
    cloneCard = cardTemplate.querySelector(".card").cloneNode(true);
    cloneCard.querySelector(".card__image").src = el.link.toString();
    cloneCard.querySelector(".card__title").textContent = el.name.toString();
    const imageCard = cloneCard.querySelector(".card__image");
    imageCard.addEventListener("click", function () {
      popupOpen(popupImage);
     let imagePopup = document.querySelector(".popup__image").src = el.link.toString();
     let imageCaption = document.querySelector(".popup__caption").textContent = el.name.toString();
    });

    //  Удаление карточки
    cloneCard.querySelector(".card__delete-button").addEventListener("click", (e) => {
        let item = e.target.closest(".card");
        item.remove();
      });

    //Лайк карточки
    cloneCard.querySelector(".card__like-button").addEventListener("click", (e) => {
        e.target.classList.toggle("card__like-button_is-active");
      });

    cardsUl.append(cloneCard);
  });
}

