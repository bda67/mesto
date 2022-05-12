let openPopup = document.querySelector('.profile__button-edit');
let closePopup = document.querySelector('.popup__button-close');
let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__bio');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_bio');
const likeButton = document.querySelectorAll('.element__button-like');

// строчки инпута дублируют инфу из профиля при открытии
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

// функции отрытия и закрытия попапа
function openEdit(evt){
    evt.preventDefault();
    popup.classList.add('popup_opened');   
}
function closeEdit(){
    popup.classList.remove('popup_opened');
}

// функция редактирования данных из формы в профиль сохр
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
   
    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;

    closeEdit()
};

// слушатели
formElement.addEventListener('submit', formSubmitHandler);
openPopup.addEventListener('click', openEdit);
closePopup.addEventListener('click', closeEdit);