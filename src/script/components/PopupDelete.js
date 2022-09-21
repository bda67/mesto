import Popup from "./Popup.js";

export class PopupDelete extends Popup {
    constructor({popupSelector}) {
        super(popupSelector)
        this._popup = document.querySelector(popupSelector);
        this._submitBtn = this._popup.querySelector('.popup__button-submit');
    }
    close() {
        super.close();
    }
    setWaitSubmit(action) {
        this._submitClick = action;
    }
    setEventListeners() {
        this._submitBtn.addEventListener('click', (evt) => this._submitClick(evt));
        super.setEventListeners()
    }
}