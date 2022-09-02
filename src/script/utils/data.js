
export const items = [
    {
      name: "Архыз",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export const buttonOpenPopupProfile = document.querySelector(".profile__button-edit");
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__bio");
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_bio");

export const buttonOpenPopupCard = document.querySelector(".profile__button-add");
export const cardNameInput = document.querySelector(".popup__input_type_cardName");
export const cardLinkInput = document.querySelector(".popup__input_type_cardLink");

export const popupAddForm = document.querySelector('.popup__form_add');
export const popupEditForm = document.querySelector('.popup__form_edit');
export const escKey = "Escape";

//selectors
export const templateSelector = ".template";
export const containerSelector = ".element";
export const popupEditSelector = '.popup_type_profile';
export const popupAddSelector = '.popup_type_card';
export const imagePopupSelector = '.popup_type_picture';
