const cardTemplate = document.getElementById("card-template").content;

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

  //Функция лайка
export function likeCard(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
  
  //Функция удалния карточки
 export function deleteCard(evt) {
    const item = evt.target.closest(".card");
    item.remove();
  }