 export class Card {
    constructor (data, templateSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick
    }

    // вовзвращать разметку в классе
    _getTemplate() {
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element__item').cloneNode(true);
      return cardElement;
    }

    generateCard() {
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector(".element__image");
      this._buttonLike = this._element.querySelector(".element__button-like");
      this._setEventListeners();
      this._cardImage.src = this._link; // Добавим данные
      this._cardImage.alt = this._name;
      this._element.querySelector(".element__name").textContent = this._name;
      return this._element;
    }

    _likeCard() {
      this._buttonLike.classList.toggle("element__button-like_activated");
    }

    _deleteCard() {
      this._element.remove();
      this._element = null;
    }

    _setEventListeners() {
      this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
    });
    this._element.querySelector(".element__button-delete").addEventListener('click', () => {
        this._deleteCard()
    });
    this._buttonLike.addEventListener('click', () => {
        this._likeCard()
    });
    }
  }