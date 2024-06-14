//  Модальнле окно 1

const popupOpen = document.querySelector(".popup__type-movie-details");
const popupImage = popupOpen.querySelector(".popup__image");
const popupTitle = popupOpen.querySelector(".popup__title");
const popupYear = popupOpen.querySelector(".popup__release-year");
const popupGaner = popupOpen.querySelector(".popup__ganer");
const popupRuntime = popupOpen.querySelector(".popup__runtime");
const popupUrl = popupOpen.querySelector(".popup__url");
const popupDescrip = popupOpen.querySelector(".popup__description");
const popupClose = popupOpen.querySelector(".popup__close");
const stopScrolling = document.querySelector(".body");

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
  popupClose.addEventListener("click", function () {
    closePopup(popup);
  });
  popupClose2.addEventListener("click", function () {
    closePopup(popup);
  });
  window.addEventListener("click", function (e) {
    if (e.target === popup) {
      closePopup(popup);
    }
  });
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  stopScrolling.classList.remove("stop-scrolling");
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

//  Модальнле окно 2

const popupOpenURL = document.querySelector(".popup__type-urls");
const popupPlatform = popupOpenURL.querySelector(".popup__platform");
const popupMovieUrl = popupOpenURL.querySelector(".popup__movieurl");
const popupClose2 = popupOpenURL.querySelector(".popup__close");
const popupMovieUrlsNode = document.querySelector(".popup__movieurls");

function generatePopupUrl(data) {
  renderPopupUrlContent(data);
  stopScrolling.classList.add("stop-scrolling");
  openPopup(popupOpenURL);
}

function renderPopupUrlContent(data) {
  const films = data.items;

  popupMovieUrlsNode.textContent = "";
  for (i = 0; i < films.length; i++) {
    const { logoUrl, platform, url } = films[i];
    popupMovieUrlsNode.innerHTML += `
      <div class="popup__movieurls-item">
        <img class="popup__movieurls-item-img" src="${logoUrl}">
        <a class="popup__movieurls-item-url" target="_blank" href="${url}">${platform}</a> 
      </div>
    `;
    // второй вариант 
    // const popupMovieUrlsItemNode = createPopupMovieUrlsItemNode(films[i]);
    // popupMovieUrlsNode.append(popupMovieUrlsItemNode);
  }
}

// второй вариант вставить ссылки на сайты из запроса

// function createPopupMovieUrlsItemNode({ logoUrl, platform, url }) {
//   const divNode = document.createElement("div");

//   divNode.classList.add("popup__movieurls-item");
//   divNode.innerHTML = `
//     <img class="popup__movieurls-item-img" src="${logoUrl}">
//     <a class="popup__movieurls-item-url" target="_blank" href="${url}">${platform}</a> 
//   `;

//   return divNode;
// }

export { openPopup, closePopup, closeEsc, generatePopup, generatePopupUrl };
