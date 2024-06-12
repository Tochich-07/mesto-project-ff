//Фукции открытия и закрытия
export function openModal(elem) {
  elem.classList.add("popup_is-opened");
  document.addEventListener('keydown', closePopupEsc);
  // document.addEventListener('click', closePopupOverlay);
}

export function closeModal(elem) {
  elem.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closePopupEsc);
  // document.removeEventListener('click', closePopupOverlay);
}

function closePopupEsc(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.key === 'Escape') {
    closeModal(openedPopup);
  }
  // if (evt.currentTarget === evt.target) {
  //   closeModal(openedPopup)
  // }
}

// // Закрытие по Оверлею
// function closePopupOverlay() {
//   if (evt.currentTarget === evt.target) {
//     closeModal(popupProfile)
// }
// } не понимаю как сделать общую функцию как с закрытием по кнопке esc


// function closePopupOverlay(evt) {
//   const openedPopup = document.querySelector(".popup_is-opened");
//  if ((openedPopup && evt.target !== openedPopup && !openedPopup.contains(evt.target))) {
//     closeModal(openedPopup);
//   }
// } 




