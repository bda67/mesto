let openPopup = document.querySelector('.profile__button-edit');
let closePopup = document.querySelector('.popup__button-close');
let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__bio');
let nameInput = formElement.querySelector('.popup__input-name');
let jobInput = formElement.querySelector('.popup__input-bio');
const likeButton = document.querySelectorAll('.element__button-like');

openPopup.addEventListener('click', function(evt){
    evt.preventDefault();
    popup.classList.add('popup__opened'); 
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

closePopup.addEventListener('click', function(){
    popup.classList.remove('popup__opened');
});


for (const button__like of likeButton){
    button__like.addEventListener('click', function(e) {
        button__like.classList.add('activated');
      });
};

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
   
    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
};

formElement.addEventListener('submit', formSubmitHandler);



