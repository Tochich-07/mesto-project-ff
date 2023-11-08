import { initialCards } from "./cards.js";

const cardTemplate = document.getElementById("card-template").content;
let cloneCard = cardTemplate.querySelector(".card").cloneNode(true);
const cardsUl = document.querySelector(".places__list");

//Отрисовка карточек
function renderCard() {
  initialCards.forEach(function (el) {
    cloneCard = cardTemplate.querySelector(".card").cloneNode(true);
    cloneCard.querySelector(".card__image").src = el.link.toString();
    cloneCard.querySelector(".card__title").textContent = el.name.toString();

    //  Удаление карточки
    cloneCard.querySelector(".card__delete-button").addEventListener("click", (e) => {
        let item = e.target.closest(".card");
        item.remove();
      });

    cardsUl.append(cloneCard);
  });
}

renderCard();

