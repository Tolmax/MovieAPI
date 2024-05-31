
const popup = document.querySelector('.popup');
const popupImage = popup.querySelector('.popup_image');
const popupTitle = popup.querySelector('.popup_title')



function openPopup(popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeEsc);
  }
  
  function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeEsc);
  }

  function closeEsc(evt) {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  }

  function generatePopup(data) {
    popupImage.src = data.posterUrlPreview;
    popupImage.alt = data.nameRu;
    popupTitle.textContent = data.nameRu;
  }

  export {generatePopup}