//Фукции открытия и закрытия
export function popupOpen(elem) {
    elem.classList.add("popup_is-opened");
  }
  
  export function popupClose(elem) {
    elem.classList.remove("popup_is-opened");
  }