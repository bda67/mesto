// Функция, добавляющая класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, objectKey) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`) // находим оошибку
  inputElement.classList.add(objectKey.inputErrorClass) // добавляем инпуту класс ошибки
  errorElement.textContent = errorMessage // заменяем содержимое span на текст ошибки
  errorElement.classList.add(objectKey.errorClass) // добавляем стили ошибки и показывем ее
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, objectKey) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(objectKey.inputErrorClass) // Скрываем сообщение об ошибке
  errorElement.classList.remove(objectKey.errorClass)
  errorElement.textContent = "" // Очистим ошибку
};

// Проверяем валидность поля и в зависимости от результата скрываем или показываем ошибку
const checkInputValidity = (formElement, inputElement, objectKey) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      objectKey
    ) // Если НЕ валидна, то показываем ошибку
  } else {
    hideInputError(formElement, inputElement, objectKey) // Если валидна, то скрываем
  }
};

// Для настройки статуса кнопки нужна проверка всех полей, а не только одного
// Функция проверяющая массив инпутов и возвращает true или false
const hasInvalidInput = (inputList) => {
  // используем метод some тк если все поля валидны нужно активировать кнопку, если хотя бы одно нет — заблокировать
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid // Если поле НЕвалидно, то вернет true
  })
};

// Функция, которая отключает и включает кнопку
const toggleButtonState = (inputList, buttonElement, objectKey) => {
  if (hasInvalidInput(inputList)) {
    //если хотя бы одно поле невалидно, то надо откл кнопку
    buttonElement.classList.add(objectKey.inactiveButtonClass)
    buttonElement.setAttribute('disabled', true)
  } else {
    // если все поля валидны, то активировать кнопку
    buttonElement.classList.remove(objectKey.inactiveButtonClass)
    buttonElement.removeAttribute('disabled')
  }
};

// Слушатель событий всех инпутов внутри формы
const setEventListeners = (formElement, objectKey) => {
  const inputList = Array.from(formElement.querySelectorAll(objectKey.inputSelector)) // массив всех инпутов формы
  const buttonElement = formElement.querySelector(objectKey.submitButtonSelector) // находим кнопку внутри формы
  toggleButtonState(inputList, buttonElement, objectKey);
  inputList.forEach((inputElement) => {
    // Обходим все инпуты и проверяем их валидность во время ввода текста
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, objectKey)
      toggleButtonState(inputList, buttonElement, objectKey)
    })
  })
};

// Добавление обработчиков всем формам
const enableValidation = (objectKey) => {
  const formList = Array.from(document.querySelectorAll(objectKey.formSelector)) // массив всех форм
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault() // Отменяем стандартное поведение формы при сабмите
    })
    setEventListeners(formElement, objectKey)
  })
};

// Объявляем функцию
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});
