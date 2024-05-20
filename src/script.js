// import { generatePopup } from "./modals";

const API_KEY = "99116293-2534-4b37-b131-ce5f5c970a85";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const userTemplate = document.querySelector("#movie").content;
const insertMovies = document.querySelector(".movie");
const form = document.querySelector('form');
const searchMovie = form.querySelector('.header__search');

getMovies(API_URL_POPULAR);

function getMovies(URL) {
  fetch(URL, {
    method: "GET",
    headers: {
      "X-API-KEY": "99116293-2534-4b37-b131-ce5f5c970a85",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((respData) => {
      console.log(respData);
      showMovies(respData);
    })
    .catch((error) => {
      console.log("Ошибка при выполнении функции: " + error);
    });
}


function getsearchedMovies(URL) {
    fetch(URL, {
      method: "GET",
      headers: {
        "X-API-KEY": "99116293-2534-4b37-b131-ce5f5c970a85",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((respData) => {
        console.log(respData);
        showSearchMovies(respData);
      })
      .catch((error) => {
        console.log("Ошибка при выполнении функции: " + error);
      });
  }

  // вешаем слушатель для поиска фильма по словам

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector('.movies').innerHTML = '';
    const apisearchMovie = `${API_URL_SEARCH}${searchMovie.value}`
    if (searchMovie.value) {
        getsearchedMovies(apisearchMovie);
        searchMovie.value = ''
    }
})

//  функция создания карточки на сайте из ответа API

function createCard(data) {
  const movieEl = userTemplate.querySelector(".movie").cloneNode(true);
  const image = movieEl.querySelector(".movie__cover");
  const imageDarkened = movieEl.querySelector(".movie__cover--darkened");
  const title = movieEl.querySelector(".movie__title");
  const category = movieEl.querySelector(".movie__category");
  const year = movieEl.querySelector(".movie__year");
  const rating = movieEl.querySelector(".movie__rating");
  const ratingColor = movieEl.querySelector(".movie__rating");
  const infor = movieEl.querySelector(".movie__info");

  if (data.ratingKinopoisk === undefined) {
    const el = infor.querySelector('.movie__rating');
    const parent = el.parentNode
    parent.removeChild(el)
  }

  getclassbyRate(data.ratingKinopoisk);

  imageDarkened.addEventListener("click", function () {
    generatePopup(data);
  });




  image.src = data.posterUrlPreview;
  image.alt = data.nameRu;
  title.textContent = data.nameRu;
  category.textContent = data.genres.map((genre) => ` ${genre.genre}`);
  year.textContent = data.year;
  rating.textContent = data.ratingKinopoisk;
  ratingColor.classList.add(`${getclassbyRate(data.ratingKinopoisk)}`);

  return movieEl;
}

function showMovies(data) {
  data.items.forEach((movie) => {
    const cardMovie = createCard(movie);
    document.querySelector(".movies").appendChild(cardMovie);
  });
}

function showSearchMovies(data) {
    data.films.forEach((movie) => {
      const cardMovie = createCard(movie);
      document.querySelector(".movies").appendChild(cardMovie);
    });
  }

// функция цвета границы кружка в зависимости от рейтинга

function getclassbyRate(vote) {
  if (vote > 7) {
    return "movie__rating--green";
  } else if (vote > 5) {
    return "movie__rating--orange";
  } else {
    return "movie__rating--red";
  }
}



//  Модальнле окно

const popupOpen = document.querySelector('.popup');
const popupImage = popupOpen.querySelector('.popup__image');
const popupTitle = popupOpen.querySelector('.popup__title');
const popupGaner = popupOpen.querySelector('.popup__ganer');
const popupRuntime = popupOpen.querySelector('.popup__runtime');
const popupUrl = popupOpen.querySelector('.popup__url');
const popupDescrip = popupOpen.querySelector('.popup__description');
const popupClose = popupOpen.querySelector('.popup__close');

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
      closePopup(popupOpen);
    }
  }
 
  function generatePopup(data) {
    popupImage.src = data.posterUrlPreview;
    popupImage.alt = data.nameRu;
    popupTitle.textContent = data.nameRu;
    popupGaner.textContent = `Жанр: ${data.genres.map((genre) => ` ${genre.genre}`)}`;
    popupRuntime.textContent = `Страна: ${data.countries.map((country) => ` ${country.country}`)}`;
    popupUrl.textContent = `Сайт: ${data.nameRu}`;
    popupDescrip.textContent = `Описание: ${data.nameRu}`;
    openPopup(popupOpen);
  }

  popupClose.addEventListener('click', function() {
    closePopup(popupOpen)
  });

// export {getMovies}