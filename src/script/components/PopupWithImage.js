import Popup from "./Popup.js";

export class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._popup_image = this._popup.querySelector('.popup__picture')
        this._popup_text = this._popup.querySelector('.popup__caption')
    }

    open(name, link) {
        this._popup_image.src = link;
        this._popup_text.textContent = name;
        this._popup_image.alt = name;
        super.open()
    }
}
    