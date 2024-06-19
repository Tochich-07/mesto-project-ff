const cardTemplate = document.getElementById("card-template").content;
const arkhyzImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chelyabinskImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovoImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url)
const kamchatkaImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url)
const kholmogorsky = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url)
const baikalImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url)

export const initialCards = [
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

export function createCard(data, deleteCard, likeCard, openModalImage) {
  const cloneCard = cardTemplate.querySelector(".card").cloneNode(true);

  cloneCard.querySelector(".card__image").src = data.link;
  cloneCard.querySelector(".card__image").alt = data.name;
  cloneCard.querySelector(".card__title").textContent = data.name;

  cloneCard.querySelector(".card__delete-button").addEventListener("click", (e) => {
    deleteCard(e)
  });

  cloneCard.querySelector(".card__like-button").addEventListener("click", (e) => {
    likeCard(e)
  });

  cloneCard.querySelector(".card__image").addEventListener("click", (e) => {
    openModalImage(data)
  });

  return cloneCard
}



