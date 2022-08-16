export class FormValidator {
    constructor (form, config) {
    this._form = form,
    this._inputSelector = config.inputSelector,
    this._submitButtonSelector = config.submitButtonSelector,
    this._inactiveButtonClass = config.inactiveButtonClass,
    this._inputErrorClass = config.inputErrorClass,
    this._errorClass = config.errorClass,
    this._errorList = this._form.querySelectorAll(".popup__input-error")
    }
    _showInputError(inputSelector, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputSelector.id}-error`); // находим оошибку
        inputSelector.classList.add(this._inputErrorClass); // добавляем инпуту класс ошибки
        errorElement.textContent = errorMessage; // заменяем содержимое span на текст ошибки
        errorElement.classList.add(this._errorClass); // добавляем стили ошибки и показывем ее
      };
    _hideInputError(inputSelector) {
        const errorElement = this._form.querySelector(`.${inputSelector.id}-error`)
        inputSelector.classList.remove(this._inputErrorClass) // Скрываем сообщение об ошибке
        errorElement.classList.remove(this._errorClass)
        errorElement.textContent = "" // Очистим ошибку
      };
    _checkInputValidity(inputSelector) {
        if (!inputSelector.validity.valid) {
          this._showInputError(
            inputSelector,
            inputSelector.validationMessage,
          ) // Если НЕ валидна, то показываем ошибку
        } else {
          this._hideInputError(inputSelector) // Если валидна, то скрываем
        }
    };
// Для настройки статуса кнопки нужна проверка всех полей, а не только одного
// Функция проверяющая массив инпутов и возвращает true или false
    _hasInvalidInput() {
    // используем метод some тк если все поля валидны нужно активировать кнопку, если хотя бы одно нет — заблокировать
    return this._inputList.some((inputSelector) => {
    return !inputSelector.validity.valid // Если поле НЕвалидно, то вернет true
    })
  };
    _toggleButtonState() {
        this._button = this._form.querySelector(this._submitButtonSelector)
    if (this._hasInvalidInput(this._inputList)) {
      //если хотя бы одно поле невалидно, то надо откл кнопку
      this.disableSubmitButton();
    } else {
      // если все поля валидны, то активировать кнопку
    this.enableSubmitButton();
    }
  };

  disableSubmitButton() {
    this._button.classList.add(this._inactiveButtonClass)
    this._button.setAttribute('disabled', true)
  }
  enableSubmitButton() {
    this._button.classList.remove(this._inactiveButtonClass)
    this._button.removeAttribute('disabled')
  }
    _setEventListeners() {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector)) // массив всех инпутов формы
        this._toggleButtonState();
        this._inputList.forEach((inputSelector) => {
        // Обходим все инпуты и проверяем их валидность во время ввода текста
        inputSelector.addEventListener("input", () => {
            this._checkInputValidity(inputSelector)
            this._toggleButtonState()
        });
        })
  };
    resetFormErrors() {
        this._errorList.forEach(error => {
            error.textContent = '';
            error.classList.remove(this._errorClass)
        })
        this._inputList.forEach(inputSelector => {
            inputSelector.classList.remove(this._inputErrorClass)
        })
    };
    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners()
    };
}