import { Card } from "./Card.js";
import { FormValidator } from "./formValidator.js";

// Попап редактирования профиля
const popupEdit = document.querySelector(".popup_type_profile");
const formElementEdit = popupEdit.querySelector(".popup__form");
const buttonOpenPopupProfile = document.querySelector(".profile__button-edit");
const buttonClosePopupProfile = popupEdit.querySelector(".popup__button-close");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__bio");
const nameInput = formElementEdit.querySelector(".popup__input_type_name");
const jobInput = formElementEdit.querySelector(".popup__input_type_bio");

// Попап добавления карточки
const popupCard = document.querySelector(".popup_type_card");
const buttonOpenPopupCard = document.querySelector(".profile__button-add");
const buttonClosePopupCard = popupCard.querySelector(".popup__button-close");
const buttonSubmitCardForm = popupCard.querySelector(".popup__button-submit");
const formElementCard = popupCard.querySelector(".popup__form");
const cardNameInput = formElementCard.querySelector(".popup__input_type_name");
const cardLinkInput = formElementCard.querySelector(".popup__input_type_bio");
const cardContainer = document.querySelector(".element");
const popupAddForm = popupCard.querySelector('.popup__form_add');

// Попап просмотра картинок с карточек
const popupPicture = document.querySelector(".popup_type_picture");
const buttonClosePopupPicture = popupPicture.querySelector(".popup__button-close");
const pictureCaption = popupPicture.querySelector(".popup__caption");
const pictureOpened = popupPicture.querySelector(".popup__picture");

// все попапы и инпуты
const popups = [popupCard, popupEdit, popupPicture];
const popupInputsAll = Array.from(document.querySelectorAll(".popup__input"));
const popupSubmitBtns = Array.from(document.querySelectorAll(".popup__button-submit"));
// кнопка эскейп
const escKey = "Escape";
//темплейт
const templateSelector = ".template";

//Универсальная функция открытия/закрытия попапов
const openPopup = (popupAny) => {
  popupAny.classList.add("popup_opened")
  document.addEventListener("keydown", closePopupEsc)
};

const closePopup = (popupAny) => {
  popupAny.classList.remove("popup_opened")
  document.removeEventListener("keydown", closePopupEsc)
};
// открытие и закрытие попапа с картинкой 
function openPopupCard(name, link) {
    pictureOpened.src = link;
    pictureOpened.alt = name;
    pictureCaption.textContent = name; 
    openPopup(popupPicture);
};
buttonClosePopupPicture.addEventListener("click", () => {
  closePopup(popupPicture)
});
// закрытие на оверлей
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup)
    }
  })
});

// закрытие попапов кнопкой ecs
function closePopupEsc(evt) {
  if (evt.key === escKey) {
    const popupOpened = document.querySelector(".popup_opened")
    closePopup(popupOpened)
  }
};


// ФОРМА ДОБАВЛЕНИЯ КАРТОЧЕК ADD
// открытие и закрытие формы
buttonOpenPopupCard.addEventListener("click", () => {
  openPopup(popupCard)
  popupAddForm.reset();
  FormAddValidator.resetFormErrors();
  FormAddValidator.disableSubmitButton();
});

buttonClosePopupCard.addEventListener("click", () => {
  closePopup(popupCard)
});

// создание карточек
function createCard(item) {
 const data = { name: item.name, link: item.link };
 const card = new Card (data, templateSelector, openPopupCard);
 return card.generateCard()
};

const renderCard = (item) => {
  cardContainer.prepend(item)
};

initialCards.forEach((item) => {
  renderCard(createCard(item))
});

function newCard() {
  renderCard(createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  }))
}

function handleSumbitAddForm(evt) {
  evt.preventDefault();
  newCard(); closePopup(popupCard)
};

popupAddForm.addEventListener('submit', handleSumbitAddForm);

//валидация формы
const FormAddValidator = new FormValidator (popupCard, config);
FormAddValidator.enableValidation();

// ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
//открытие попапа редактивроания
buttonOpenPopupProfile.addEventListener("click", () => {
  openPopup(popupEdit)
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
  FormEditValidator.resetFormErrors()
});
buttonClosePopupProfile.addEventListener("click", () => {
  closePopup(popupEdit)
});

function handleSumbitEditForm(evt) {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
};
// событие сабмита
formElementEdit.addEventListener("submit", handleSumbitEditForm);
// валидация формы
const FormEditValidator = new FormValidator (formElementEdit, config);
FormEditValidator.enableValidation();



