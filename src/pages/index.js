import "./index.css";
import { Card } from "../script/components/Card.js";
import { FormValidator } from "../script/components/FormValidator.js";
import { Section } from "../script/components/Section.js";
import { UserInfo } from '../script/components/UserInfo.js'
import { PopupWithForm } from "../script/components/PopupWithForm.js";
import { PopupWithImage } from "../script/components/PopupWithImage.js";
import {  items, buttonOpenPopupProfile, profileName, profileJob, nameInput, jobInput, buttonOpenPopupCard,
  cardNameInput, cardLinkInput, popupAddForm, popupEditForm, config, templateSelector, containerSelector, 
  popupEditSelector, popupAddSelector, imagePopupSelector
} from '../script/utils/data.js'; 

//Универсальная функция открытия/закрытия попапов
// открытие картинки в карточке
const popupWithImage = new PopupWithImage(imagePopupSelector);
popupWithImage.setEventListeners();
// открытие попапа при клике на картинку
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};
// инфа о пользователе экземпляр класса юзеринфо
const user = new UserInfo({ profileName, profileJob });

// Открыите попапа редактирования
buttonOpenPopupProfile.addEventListener('click', () => {
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  validatorEditProfile.resetFormErrors();
  popupEdit.open();
});
//сабмит слушатель 
const popupEdit = new PopupWithForm({
  popupSelector: popupEditSelector,
  handleFormSubmit: (data) => {
    user.setUserInfo({ name: data.name, job: data.bio });
  }
})

popupEdit.setEventListeners(); 

// ФОРМА ДОБАВЛЕНИЯ КАРТОЧЕК ADD
//форма добавления карточки
const popupAddCard = new PopupWithForm({
  popupSelector: popupAddSelector,
  handleFormSubmit: () => {
    renderCard(createCard({
      name: cardNameInput.value,
      link: cardLinkInput.value
    }));
  }
})
// открытие попапа добавления карточки
buttonOpenPopupCard.addEventListener("click", () => {
  popupAddCard.open();
  popupAddForm.reset();
  validatorAddCard.resetFormErrors();
  validatorAddCard.disableSubmitButton();
});
popupAddCard.setEventListeners(); 


// создание карточек
function createCard(item) {
 const cardData = { name: item.name, link: item.link };
 const card = new Card(cardData, templateSelector, handleCardClick);
 return card.generateCard()
};

const renderCard = (item) => {
  cardList.addItem(item)
};

//валидация формы
const validatorAddCard = new FormValidator (popupAddForm, config);
validatorAddCard.enableValidation();
const validatorEditProfile = new FormValidator (popupEditForm, config);
validatorEditProfile.enableValidation();


// ОТРИСОВКА ЭЛЕМЕНТОВ(КАРТОЧЕК) НА СТРАНИЦЕ
const cardList = new Section({
  items: items,
  renderer: (item) => {
    const card = new Card(item, templateSelector, handleCardClick);
    const newCard = card.generateCard();
    cardList.addItem(newCard)
  }
}, containerSelector);

cardList.renderItems();



