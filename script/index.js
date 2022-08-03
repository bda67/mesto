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

// При загрузке на странице должно быть 6 карточек, которые добавит JavaScript.
const initialCards = [
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

//Универсальная функция открытия/закрытия попапов
const openPopup = (popupAny) => {
  popupAny.classList.add("popup_opened")
  document.addEventListener("keydown", closePopupEsc)
};

const closePopup = (popupAny) => {
  popupAny.classList.remove("popup_opened")
  document.removeEventListener("keydown", closePopupEsc)
};

const disactivateSubmitButton = () => {
  buttonSubmitCardForm.setAttribute('disabled', true)
  buttonSubmitCardForm.classList.add('popup__button-submit_disabled')
};

const createCard = ({ link, name }) => {
  const cardTemplate = document.querySelector(".template").content
  const cardElement = cardTemplate.querySelector(".element__item").cloneNode(true)
  const cardName = cardElement.querySelector(".element__name")
  cardName.textContent = name
  const cardImage = cardElement.querySelector(".element__image")
  cardImage.src = link
  cardImage.alt = name
  const buttonLike = cardElement.querySelector(".element__button-like")
  const deleteCardBtn = cardElement.querySelector(".element__button-delete")

  // Сделайте так, чтобы карточки можно было лайкать
  buttonLike.addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__button-like_activated")
  })

  // Добавьте карточкам иконку удаления. Настройте ее так, чтобы карточка удалялась при клике на эту иконку
  deleteCardBtn.addEventListener("click", (evt) => {
    evt.target.closest(".element__item").remove()
  })

  // Настройте просмотр фотографий. Пусть открываются нажатием на картинку и закрываются кликом на крестик
  cardImage.addEventListener("click", () => {
    pictureOpened.src = link
    pictureOpened.alt = name
    pictureCaption.textContent = name
    openPopup(popupPicture)
  })

  return cardElement
};

const renderCard = (card) => {
  cardContainer.append(createCard(card))
};

initialCards.forEach((item) => {
  renderCard(item)
});

// Дайте пользователю возможность добавлять карточки. Сделайте так, чтобы при клике на «сохранить» новая карточка попадала в начало контейнера с ними. А диалоговое окно после добавления автоматически закрывалось.
formElementCard.addEventListener("submit", (evt) => {
  evt.preventDefault()
  const newCard = createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  })
  cardContainer.prepend(newCard)
  closePopup(popupCard)

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

// слушатели
formElementEdit.addEventListener("submit", (evt) => {
  evt.preventDefault()

  const nameInputValue = nameInput.value
  const jobInputValue = jobInput.value

  profileName.textContent = nameInputValue
  profileJob.textContent = jobInputValue

  closePopup(popupEdit)
});

buttonOpenPopupProfile.addEventListener("click", () => {
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
  openPopup(popupEdit)
});

buttonClosePopupProfile.addEventListener("click", () => {
  closePopup(popupEdit)
});

buttonOpenPopupCard.addEventListener("click", () => {
  openPopup(popupCard)
  popupAddForm.reset();
  disactivateSubmitButton(buttonSubmitCardForm);
});

buttonClosePopupCard.addEventListener("click", () => {
  closePopup(popupCard)
});

buttonClosePopupPicture.addEventListener("click", () => {
  closePopup(popupPicture)
});