//Фукции открытия и закрытия
export function openModal(elem) {
  elem.classList.add("popup_is-opened");
  document.addEventListener('keydown', closePopupEsc);
}

export function closeModal(elem) {
  elem.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}




