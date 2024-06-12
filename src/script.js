// import { generatePopup } from "./modals";

const API_KEY = "99116293-2534-4b37-b131-ce5f5c970a85";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_SIMILAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
const API_URL_MOVIE_INFO =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
const API_URL_URLS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/'

const userTemplate = document.querySelector("#movie").content;
const insertMovies = document.querySelector(".movie");
const form = document.querySelector("form");
const searchMovie = form.querySelector(".header__search");
const stopScrolling = document.querySelector(".body");

const userTemplate1 = document.querySelector("#similarmovie").content;
const similarMovies = document.querySelector(".popup__movie-similar");
const movieUrls = document.querySelector(".popup__movie-url");

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

//  запрос для поиска фильма по словам

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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector(".movies").innerHTML = "";
  const apisearchMovie = `${API_URL_SEARCH}${searchMovie.value}`;
  if (searchMovie.value) {
    getsearchedMovies(apisearchMovie);
    searchMovie.value = "";
  }
});

//  запрос на получение данных фильма по ID

let filmId
console.log(filmId)

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
      filmId = respData.kinopoiskId;
      console.log(filmId);
      generatePopup(respData);
      return filmId
    })
    .catch((error) => {
      console.log("Ошибка при выполнении функции: " + error);
    });
}

//  запрос на получение похожих фильмов

function getsimilarMovies(URL) {
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
      showsimilarMovies(respData);
      closePopup(popupOpen);
    })
    .catch((error) => {
      console.log("Ошибка при выполнении функции: " + error);
    });
}

// вешаем слушатель для поиска похожих фильмов

similarMovies.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".movies").innerHTML = "";
  closePopup(popupOpen);
  const apisimilarMovie = `${API_URL_SIMILAR}${filmId}${"/similars"}`;
  getsimilarMovies(apisimilarMovie);
});

//  запрос на получение URLs выбранного фильма

function getMovieURLs(URL) {
  fetch(URL, {
    method: "GET",
    headers: {
      "X-API-KEY": "99116293-2534-4b37-b131-ce5f5c970a85",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((respData) => {
      const data = respData.items
      console.log(respData);
      console.log(data);
      console.log(data.url);
      closePopup(popupOpen);
      // console.log(respData.platform);
      // console.log(respData.url);
      // console.log(respData.items.url);
      generatePopupUrl(respData);
      // return data
    })
    // .then(console.log(data))
    .catch((error) => {
      console.log("Ошибка при выполнении функции: " + error);
    });
}

// вешаем слушатель на получение URLs выбранного фильма

movieUrls.addEventListener("click", (e) => {
  e.preventDefault();
  // document.querySelector(".movies").innerHTML = "";
  // closePopup(popupOpen);
  console.log('click')
  console.log(filmId)
  const apiMovieUrls = `${API_URL_URLS}${filmId}${"/external_sources?page=1"}`;
  console.log(apiMovieUrls);
  getMovieURLs(apiMovieUrls);
});



// // // // функция создания карточки на сайте из ответа API

function createCard(data) {
  const movieEl = userTemplate.querySelector(".movie").cloneNode(true);
  const image = movieEl.querySelector(".movie__cover");
  const movieDetails = movieEl.querySelector(".movie__cover--darkened");
  const title = movieEl.querySelector(".movie__title");
  const category = movieEl.querySelector(".movie__category");
  const year = movieEl.querySelector(".movie__year");
  const rating = movieEl.querySelector(".movie__rating");
  const ratingColor = movieEl.querySelector(".movie__rating");
  const infor = movieEl.querySelector(".movie__info");

  if (data.ratingKinopoisk === undefined) {
    const el = infor.querySelector(".movie__rating");
    const parent = el.parentNode;
    parent.removeChild(el);
  }

  getclassbyRate(data.ratingKinopoisk);


  // вешаем слушатель для получения деталей о фильме

  movieDetails.addEventListener("click", function () {
    if (data.kinopoiskId === undefined) {
      let movieUrl = `${API_URL_MOVIE_INFO}${data.filmId}`;
      getMoviesDetails(movieUrl);
    } else {
      let movieUrl = `${API_URL_MOVIE_INFO}${data.kinopoiskId}`;
      getMoviesDetails(movieUrl);
    }
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

// // // // функция создания карточек на сайте из ответа API - похожие фильмы

function createsimilarCard(data) {
  const movieEl1 = userTemplate1.querySelector(".similarmovie").cloneNode(true);
  const image1 = movieEl1.querySelector(".similarmovie__cover");
  const movieDetails = movieEl1.querySelector(".similarmovie__cover--darkened");
  const title = movieEl1.querySelector(".similarmovie__title");

  // getclassbyRate(data.ratingKinopoisk);

  // вешаем слушатель для получения деталей о фильме

  movieDetails.addEventListener("click", function () {
    if (data.kinopoiskId === undefined) {
      let movieUrl = `${API_URL_MOVIE_INFO}${data.filmId}`;
      getMoviesDetails(movieUrl);
    } else {
      let movieUrl = `${API_URL_MOVIE_INFO}${data.kinopoiskId}`;
      getMoviesDetails(movieUrl);
    }
  });

  image1.src = data.posterUrlPreview;
  image1.alt = data.nameRu;
  title.textContent = data.nameRu;
  // console.log(data.nameRu)
  
  return movieEl1;
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

function showsimilarMovies(data) {
  data.items.forEach((movie) => {
    // console.log(movie);
    const similarMovie = createsimilarCard(movie);
    document.querySelector(".movies").appendChild(similarMovie);
  });
}

// функция цвета границы кружка в зависимости от рейтинга

function getclassbyRate(vote) {
  if (vote > 7) {
    return "movie__rating_green";
  } else if (vote > 5) {
    return "movie__rating_orange";
  } else {
    return "movie__rating_red";
  }
}

//  Модальнле окно 1

const popupOpen = document.querySelector(".popup__type-movie-details");
const popupImage = popupOpen.querySelector(".popup__image");
const popupTitle = popupOpen.querySelector(".popup__title");
const popupYear = popupOpen.querySelector(".popup__release-year");
const popupGaner = popupOpen.querySelector(".popup__ganer");
const popupRuntime = popupOpen.querySelector(".popup__runtime");
const popupUrl = popupOpen.querySelector(".popup__url");
const popupDescrip = popupOpen.querySelector(".popup__description");
const popupClose = document.querySelector(".popup__close");

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
    closePopup(popupOpenURL);
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
  closePopup(popupOpenURL);
});

window.addEventListener("click", function (e) {
  if (e.target === popupOpen) {
    closePopup(popupOpen)
  } else if (e.target === popupOpenURL) {
    closePopup(popupOpenURL);
  }
});

//  Модальнле окно 2

const popupOpenURL = document.querySelector('.popup__type-urls');
const popupPlatform = popupOpenURL.querySelector('.popup__platform');
const popupMovieUrl = popupOpenURL.querySelector('.popup__movie-url');


function generatePopupUrl(data) {
  // popupPlatform.textContent = '' //data.platform;
  // popupMovieUrl.textContent = '' //`${data.url}`;
  stopScrolling.classList.add("stop-scrolling");
  console.log(data.items.platform)
  QQ(data);
  openPopup(popupOpenURL);
}

function QQ(data) {

  popupPlatform.textContent = `${data.items.map(
  (platform) => `${platform.platform}`)}`;
  console.log(data.items.platform)
  // popupMovieUrl.href = `${data.items.map(
  //   (url) => `${url.url}`)}`;
//   popupMovieUrl.textContent = `${data.items.map(
//     (url) => `${url.url}`)}`;
}

// popupGaner.textContent = `Жанр: ${data.genres.map(
//   (genre) => ` ${genre.genre}`
// )}`;

// export {getMovies}
