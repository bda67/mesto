import Popup from "./Popup.js";

export class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__picture')
        this._popupText = this._popup.querySelector('.popup__caption')
    }

    open(name, link) {
        this._popupImage.src = link;
        this._popupText.textContent = name;
        this._popupImage.alt = name;
        super.open()
    }
}
    