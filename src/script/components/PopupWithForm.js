import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._button = this._popup.querySelector('.popup__button-submit');
        this.buttonOriginalText = this._button.textContent;
}
_getInputValues() {
    this._values = {};
    this._inputList.forEach(input => this._values[input.name] = input.value);
    return this._values;
}
close() {
    super.close();
    this._form.reset()
}
// загрузка формы и ноый текст кнопки
saving(data) {
    if(data) {
        this._button.textContent = 'Сохранение...';
    } else if(!data) {
        this._button.textContent = this.buttonOriginalText;
    }
}

setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this.saving(true);
        this._handleFormSubmit(this._getInputValues());
    });
}
}
