import { initialCards } from "./components/cards.js";
import { createCard, likeCard, deleteCard } from "./components/card.js";
import { closeModal, openModal } from "./components/modal.js";
import { enableValidation } from "./components/validation.js";
import { getDataProfile, getDataCards, sendCardData, updateDataProfile, changeUserAvatar } from "./components/api.js";
import './styles/index.css';

const popupTypeImage = document.querySelector(".popup_type_image");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");
const profileAvaPic = document.querySelector(".profile__image");
const profilePopupAva = document.querySelector(".popup_type_change-avatar")

const buttonPopupOpen = document.querySelector(".profile__edit-button")
const popupProfile = document.querySelector(".popup_type_edit")
const popupAdd = document.querySelector(".popup_type_new-card");
const formNewCard = document.forms.new__place
const formProfile = document.forms.edit__profile
const name = formProfile.elements.name
const description = formProfile.elements.description
const btnAddCard = document.querySelector(".profile__add-button");
const formElementProfile = document.querySelector(".popup__form");
const cardsUl = document.querySelector(".places__list");
const inputPlaceHeading = document.querySelector(".popup__input_type_card-name");
const inputPlaceLink = document.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup__image")
const popupCaption = document.querySelector(".popup__caption")
const profileImage = document.querySelector(".profile__image")

let myId = null

btnAddCard.addEventListener("click", function () {
  openModal(popupAdd);
});

profileAvaPic.addEventListener("click", function () {
  openModal(profilePopupAva);
});

//Закрытие модальных окон
document.querySelectorAll('.popup__close').forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });
})

//Открытие попапа профиля
buttonPopupOpen.addEventListener("click", function () {
  openModal(popupProfile);
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
});

//Функция редактирования профиля
function handlerFormProfile(evt) {
  evt.preventDefault();
  renderLoading(true,formProfile.elements['edit-button']);

  updateDataProfile({name: name.value, about: description.value})
		.then((res) => {
			nameElement.textContent = res.name;
			jobElement.textContent = res.about;
			closeModal(popupProfile);
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => renderLoading(false, formProfile.elements['edit-button']));
}

formProfile.addEventListener("submit", handlerFormProfile);

// Открытие модалки при клике на фото
function openModalImage(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;

  openModal(popupTypeImage)
};

function addCards(el, deleteCard) {
  const cardElement = createCard(el, deleteCard, likeCard, openModalImage)
  cardsUl.prepend(cardElement);
}

//Создание карточки
formNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true,formNewCard.elements['new-card-button']);

  sendCardData({ name: inputPlaceHeading.value, link: inputPlaceLink.value })
	.then((card) => {
		addCards({name: card.name,
			link: card.link,
			cardId: card._id,
			cardOwnerId: card.owner._id,
			myId: card.owner._id,
			likes: card.likes
			}, deleteCard);
			formNewCard.reset();
			closeModal(popupAdd);
	})
	.catch((err) => {
		console.log(err);
	})
	.finally(() => renderLoading(false, formNewCard.elements['new-card-button']));
});



//Отрисовка карточек
function renderCard(data) {
  data.forEach(function (el) {
    const card = createCard(el, deleteCard, likeCard, openModalImage)

    cardsUl.prepend(card);
  });
}


enableValidation();

getDataCards().then((result) => {
  renderCard(result);
});


const isLoadingText = 'Сохранение...';
const originalText = 'Сохранить';

function renderLoading(isLoading, button) {
	button.textContent = isLoading ? isLoadingText : originalText;
}

const formChangeAvatarElement = document.forms['change-avatar'];
const newAvatarUrlInput = formChangeAvatarElement.elements.link;

function handleChangeAvatarForm(evt) {
  evt.preventDefault();
  renderLoading(true, formChangeAvatarElement.elements['change-avatar-button']);
  changeUserAvatar(newAvatarUrlInput.value)
      .then(newAvatarConfig => {
        profileImage.style = "background-image: url(" + newAvatarConfig.avatar + ");";
        closeModal(document.querySelector('.popup_is-opened'));
        resetChangeAvatarForm();
      })
      .catch(err => {console.log(err)})
      .finally(() => renderLoading(false, formChangeAvatarElement.elements['change-avatar-button']));

}

formChangeAvatarElement.addEventListener('submit', handleChangeAvatarForm);

function resetChangeAvatarForm() {
	formChangeAvatarElement.reset();
}

Promise.all([getDataCards(), getDataProfile()])
.then(([cardsArray, myUserData]) => {
	cardsArray.reverse().forEach(card => addCards(
		{ name: card.name,
			link: card.link,
			cardId: card._id,
			cardOwnerId: card.owner._id,
			myId: myUserData._id,
			likes: card.likes}, deleteCard))

			changeUserData({name: myUserData.name,
				description: myUserData.about,
				avatar: myUserData.avatar});
    })
    .catch(err => {console.log(err)});

function changeUserData(userDataConfig) {
    nameElement.textContent = userDataConfig.name;
    jobElement.textContent = userDataConfig.description;
    profileImage.style = "background-image: url(" + userDataConfig.avatar + ");";

    name.value = nameElement.textContent;
		description.value = jobElement.textContent;
}