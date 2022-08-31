import { escKey } from "./data.js";
export default class Popup{
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    _handleEscClose(evt){
        if(evt.key === escKey) {
            this.close()
        }
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
    }
    close() {
        this._popup.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscClose)
    }
    setEventListeners() {
       this._popup.addEventListener('click', (evt) => {
        if(evt.target === evt.currentTarget || evt.target.classList.contains("popup__button-img")) {
            this.close(this._popup);
        }
       }) 
    }
}