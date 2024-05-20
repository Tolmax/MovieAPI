// import { generatePopup } from "./modals";

const API_KEY = "99116293-2534-4b37-b131-ce5f5c970a85";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_SIMILAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/{ID}}/similars";
const API_URL_MOVIE_INFO = "https://kinopoiskapiunofficial.tech/api/v2.2/films/"

const userTemplate = document.querySelector("#movie").content;
const insertMovies = document.querySelector(".movie");
const form = document.querySelector('form');
const searchMovie = form.querySelector('.header__search');
const stopScrolling = document.querySelector('.body')

getMovies(API_URL_POPULAR);

//  запрос на получение топ 250 фильмов

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

//  запрос на получение фильмов по поиску

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

  //  запрос на получение данных фильма по ID

function getMoviesDetails(URL) {
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
      generatePopup(respData);
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
    const movieUrl = `${API_URL_MOVIE_INFO}${data.kinopoiskId}`;
    getMoviesDetails(movieUrl);
    // generatePopup(data);
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
const popupYear = popupOpen.querySelector('.popup__release-year')
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
    stopScrolling.classList.remove('stop-scrolling');
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
    popupYear.textContent = data.year;
    popupGaner.textContent = `Жанр: ${data.genres.map((genre) => ` ${genre.genre}`)}`;
    popupRuntime.textContent = `Продолжительность: ${data.filmLength} минут`;
    popupUrl.href = `${data.webUrl}`
    popupUrl.textContent = `${data.webUrl}`;
    popupDescrip.textContent = `Описание: ${data.description}`;
    stopScrolling.classList.add('stop-scrolling');
    openPopup(popupOpen);
  }

  popupClose.addEventListener('click', function() {
    closePopup(popupOpen)
  });

  window.addEventListener('click', function(e) {
    if (e.target === popupOpen) {
    closePopup(popupOpen)
    }
  });


// export {getMovies}