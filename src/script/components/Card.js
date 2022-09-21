 export class Card {
    constructor (data, templateSelector, { handleCardClick, handleDeleteBtn, putDislike, putLike }) {
      this._data = data;
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._id = data._id;
      this._userId = data.userId;
      this._ownerId = data.ownerId;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._handleDeleteBtn = handleDeleteBtn;
      this._putDislike = putDislike;
      this._putLike = putLike;
    }

    // вовзвращать разметку в классе
    _getTemplate() {
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element__item').cloneNode(true);
      return cardElement;
    }

    generateCard() {
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector('.element__image');
      this._buttonLike = this._element.querySelector('.element__button-like');
      this._cardImage.src = this._link; // Добавим данные
      this._cardImage.alt = this._name;
      this._element.querySelector('.element__name').textContent = this._name;
      this._deleteBtn = this._element.querySelector('.element__button-delete');
      this._counter = this._element.querySelector('.element__counter');
      this._counter.textContent = this._likes.length;
      this._userLiked = this._likes.some(like => like._id === this._userId);

      this._setEventListeners();
      this._removeDeleteBtn();
      this._isLiked();

      return this._element;
    }


    // если карточка НЕ моя, то кнопки удаления быть не должно
    _removeDeleteBtn() {
      if (this._userId !== this._ownerId) {
        this._deleteBtn.remove();
        this._deleteBtn = null;
      }
    }
    // если я поставила лайк, то он его закрасит
    _isLiked(){
      if (this._userLiked) {
        this._buttonLike.classList.add('element__button-like_activated');
      }
    }

    // общая функция постановки лайка на карточку
    likeCard() {
      this._buttonLike.classList.add('element__button-like_activated');
    }
    // общая фу-я убираем лайк с карточки
    dislikeCard() {
      this._buttonLike.classList.remove('element__button-like_activated');
    }
    // общая фу-я удаления карточки 
    deleteCard() {
      this._element.remove();
      this._element = null;
    }
    // тут будет установка счетчика лайка
    setLikeCounter(data) {
      this._buttonLike.classList.toggle('element__button-like_activated');
      this._counter.textContent = data.likes.length;
    }
    getCardId() {
      return this._id;
    }
    // слушатели
    _setEventListeners() {
      this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link)
    });
    this._element.querySelector('.element__button-delete').addEventListener('click', () => {
        this._handleDeleteBtn(this._data)
    });
    this._buttonLike.addEventListener('click', (evt) => {
        if(this._element.querySelector('.element__button-like').classList.contains('element__button-like_activated')) {
          this._putDislike(evt);
        } else {
          this._putLike(evt);
        }
    });
    }
}