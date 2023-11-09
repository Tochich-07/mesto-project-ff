import { initialCards } from "./cards.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

//Создание карточки
function createCard(card, onDelete) {
  const cloneCard = cardTemplate.querySelector(".card").cloneNode(true);
  cloneCard.querySelector(".card__image").src = card.link;
  cloneCard.querySelector(".card__image").alt = card.name;
  cloneCard.querySelector(".card__title").textContent = card.name;
  cloneCard.querySelector(".card__delete-button").addEventListener("click", onDelete);
  return cloneCard;
}

//Удаление карточки
function deleteCard(e) {
  let item = e.target.closest(".card");
  item.remove();
}

//Отрисовка карточек
function renderInitialCards() {
  initialCards.forEach((item) => {
    const card = createCard(item, deleteCard);
    cardsContainer.append(card);
  });
}

renderInitialCards();
