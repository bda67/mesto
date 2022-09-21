import "./index.css";
import { PopupDelete } from "../script/components/PopupDelete.js";
import { Api } from "../script/components/Api.js";
import { Card } from "../script/components/Card.js";
import { FormValidator } from "../script/components/FormValidator.js";
import { Section } from "../script/components/Section.js";
import { UserInfo } from '../script/components/UserInfo.js'
import { PopupWithForm } from "../script/components/PopupWithForm.js";
import { PopupWithImage } from "../script/components/PopupWithImage.js";
import { buttonOpenPopupProfile, profileName, profileJob, nameInput, jobInput, buttonOpenPopupCard,
  popupAvatarForm, profileAvatar, profileAvatarButton, popupAddForm, popupEditForm, config, templateSelector, containerSelector, 
  popupEditSelector, popupAddSelector, imagePopupSelector
} from '../script/utils/data.js'; 

/////////////
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: '2b841529-df62-4b38-96c6-07d20dc3dbf9',
    'Content-Type': 'application/json'
  }
});
////////////

/// ВАЛИДАЦИЯ ФОРМ
const validatorAddCard = new FormValidator (popupAddForm, config);
validatorAddCard.enableValidation();

const validatorEditProfile = new FormValidator (popupEditForm, config);
validatorEditProfile.enableValidation();

const validatorAvatarProfile = new FormValidator (popupAvatarForm, config);
validatorAvatarProfile.enableValidation()

//Попап с картинкой
const popupWithImage = new PopupWithImage(imagePopupSelector);
popupWithImage.setEventListeners()

//Попап удаления карточки
const popupDelete = new PopupDelete({ popupSelector: '.popup_type_delete' });
popupDelete.setEventListeners()


// ПОПАП РЕДАКТИРОВАНИЯ 
const popupEdit = new PopupWithForm({
  popupSelector: popupEditSelector,
  handleFormSubmit: (inputValues) => {
    api.setUserData(inputValues)
      .then(() => {
        user.setUserInfo(inputValues);
        popupEdit.close();
      })
      .catch(() => {
        console.log('Ошибка! Не получилось изменить данные профиля :(')
      })
  }
});

popupEdit.setEventListeners(); 

// Открыите попапа редактирования
buttonOpenPopupProfile.addEventListener('click', () => {
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  validatorEditProfile.resetFormErrors();
  popupEdit.open();
});

// ФОРМА ДОБАВЛЕНИЯ КАРТОЧЕК ADD
//форма добавления карточки
const popupAddCard = new PopupWithForm({
  popupSelector: popupAddSelector,
  handleFormSubmit: (inputValues) => {
    api.createNewCard(inputValues)
    .then((inputValues) => {
      cardList.addItem(createCard(inputValues));
      popupAddCard.close()
    })
    .catch(() => {
      console.log('Ошибка! Не удалось добавить вашу карточку :(')
    })
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

// попап с АВАТАРОМ
const popupAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (inputValues) => {
    api.setAvatar(inputValues)
      .then(() => {
        user.setAvatarPicture(inputValues);
        popupAvatar.close()
      })
      .catch(() => {
        console.log('Ошибка! Не удалось поменять аватар :(')
      })
  }
});
profileAvatarButton.addEventListener('click', () => {
  validatorAvatarProfile.resetFormErrors();
  validatorAvatarProfile.disableSubmitButton();
  popupAvatar.open();

})
popupAvatar.setEventListeners()

// создание карточек
function createCard(data) {
  const card = new Card({
    data,
    name: data.name,
    link: data.link,
    likes: data.likes,
    userId: user.getUserId(),
    ownerId: data.owner._id,
    _id: data._id,
  }, templateSelector, { 

      handleCardClick: (name, link) => {  // при нажатии на карточку открывается просмотр картинки
        popupWithImage.open(name, link)
      },
      handleDeleteBtn: (data) => {
        popupDelete.setWaitSubmit((evt) => {
          evt.preventDefault();
          api.deleteIdCard(data._id)
            .then(() => {
              card.deleteCard(card);
              popupDelete.close()
            })
            .catch(() => {
              console.log('Ошибка! Не удалось удалить вашу карточку :(')
            })
        })
        popupDelete.open();
      },
      putDislike: () => {
        api.dislike(data)
          .then((data) => {
            card.setLikeCounter(data); //при дизлайке счетчик уменьшится
            card.dislikeCard();
          })
          .catch(() => {
            console.log('Ошибка! Не получилось убрать лайк :(');
          })
      },
      putLike: () => {
        api.like(data)
          .then((data) => {
            card.setLikeCounter(data); //при лайка счетчик увеличится
            card.likeCard();
          })
          .catch(() => {
            console.log('Ошибка! Не получилось поставить лайк :(')
          })
      }
   })
   return card.generateCard();
}

//валидация форм



// ОТРИСОВКА ЭЛЕМЕНТОВ(КАРТОЧЕК) НА СТРАНИЦЕ
const cardList = new Section({
  renderer: (data) => {
    const card = createCard(data);
    cardList.addItem(card);
  },
}, containerSelector);

// инфа о пользователе экземпляр класса юзеринфо
const user = new UserInfo({ profileName, profileJob, profileAvatar });

// Загрузка данных и карточек с сервера
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    user.setUserId(userData._id);
    user.setUserInfo(userData);
    cardList.renderItems(cards.reverse());
  })
  .catch(() => {
    console.log('Не получилось загрузить данные :(')
  })





