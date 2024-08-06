import { deleteCardRequest, addLikeRequest, deleteLikeRequest } from "./api.js";

const cardTemplate = document.getElementById("card-template").content;


export function createCard(data, deleteCard, likeCard, openModalImage) {
  const cloneCard = cardTemplate.querySelector(".card").cloneNode(true);

  cloneCard.querySelector(".card__image").src = data.link;
  cloneCard.querySelector(".card__image").alt = data.name;
  cloneCard.querySelector(".card__title").textContent = data.name;

  const cardDeleteButton = cloneCard.querySelector(".card__delete-button")
  if (data.cardOwnerId != data.myId) {
    cardDeleteButton.classList.add("card__delete-button-hidden");
  } else {
    cardDeleteButton.addEventListener('click', (evt) => {
      deleteCard(evt, data.cardId);
    });
  }

  const cardLikeButton = cloneCard.querySelector(".card__like-button")
  if (data.likes.length != 0) {
    data.likes.some((element) => {
      if (element._id === data.myId) {
        cardLikeButton.classList.add("card__like-button_is-active");
      }
    });
  }

  const cardLikeCounts = cloneCard.querySelector(".card__like-counts");
  cardLikeCounts.textContent = data.likes.length;

  cardLikeButton.addEventListener("click", (evt) => { likeCard(evt, data.cardId, cardLikeCounts) });

  cloneCard.querySelector(".card__image").addEventListener("click", (e) => {
    openModalImage(data)
  });

  return cloneCard
}

//Функция лайка
 function likeCardClassToggle(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function likeMethod(evt, cardId) {
  const like = evt.target.classList.contains("card__like-button_is-active") ? deleteLikeRequest(cardId) : addLikeRequest(cardId);
  return like
}

export const likeCard = (evt, cardId, cardLikeCounts) => {
  likeMethod(evt, cardId)
    .then((newCardConfig) => {
      cardLikeCounts.textContent = newCardConfig.likes.length;
      likeCardClassToggle(evt);
    })
    .catch((err) => console.log(err));
}

//Функция удалния карточки
export function deleteCard(evt, cardId) {
  deleteCardRequest(cardId)
    .then(() => {
      const card = evt.target.closest(".card");
      card.remove();
    })
    .catch((err) => console.log(err));
}