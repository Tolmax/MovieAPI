const popupOpen = document.querySelector(".popup");
const popupImage = popupOpen.querySelector(".popup__image");
const popupTitle = popupOpen.querySelector(".popup__title");
const popupYear = popupOpen.querySelector(".popup__release-year");
const popupGaner = popupOpen.querySelector(".popup__ganer");
const popupRuntime = popupOpen.querySelector(".popup__runtime");
const popupUrl = popupOpen.querySelector(".popup__url");
const popupDescrip = popupOpen.querySelector(".popup__description");
const popupClose = popupOpen.querySelector(".popup__close");

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEsc);
  stopScrolling.classList.remove("stop-scrolling");
}

function closeEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(popupOpen);
  }
}

function generatePopup(data) {
  popupImage.src = data.posterUrlPreview;
  popupImage.alt = data.nameRu;
  popupTitle.textContent = `"${data.nameRu}"    `;
  popupYear.textContent = data.year;
  popupGaner.textContent = `Жанр: ${data.genres.map(
    (genre) => ` ${genre.genre}`
  )}`;
  popupRuntime.textContent = `Продолжительность: ${data.filmLength} минут`;
  popupUrl.href = `${data.webUrl}`;
  popupUrl.textContent = `${data.webUrl}`;
  popupDescrip.textContent = `Описание: ${data.description}`;
  stopScrolling.classList.add("stop-scrolling");
  openPopup(popupOpen);
}

popupClose.addEventListener("click", function () {
  closePopup(popupOpen);
});

window.addEventListener("click", function (e) {
  if (e.target === popupOpen) {
    closePopup(popupOpen);
  }
});