import { createCard, createsimilarCard } from './films'
import { openPopup, closePopup, closeEsc, generatePopup } from './modals'


const API_KEY = "99116293-2534-4b37-b131-ce5f5c970a85";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_SIMILAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
const API_URL_MOVIE_INFO =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

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
      showMovies(respData);
    })
    .catch((error) => {
      console.log("Ошибка при выполнении функции: " + error);
    });
}

function showMovies(data) {
  data.items.forEach((movie) => {
    const cardMovie = createCard(movie);
    document.querySelector(".movies").appendChild(cardMovie);
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

function showSearchMovies(data) {
  data.films.forEach((movie) => {
    const cardMovie = createCard(movie);
    document.querySelector(".movies").appendChild(cardMovie);
  });
}

//  запрос на получение данных фильма по ID

// let filmId;

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
      filmId = respData.kinopoiskId;
      generatePopup(respData);
      return filmId;
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

function showsimilarMovies(data) {
  data.items.forEach((movie) => {
    const similarMovie = createsimilarCard(movie);
    document.querySelector(".movies").appendChild(similarMovie);
  });
}

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
      closePopup(popupOpen);
      generatePopupUrl(respData);
    })
    .catch((error) => {
      console.log("Ошибка при выполнении функции: " + error);
    });
}
  
export {
  API_KEY,
  API_URL_POPULAR,
  API_URL_SEARCH,
  API_URL_SIMILAR,
  API_URL_MOVIE_INFO,
  getMovies,
  getsearchedMovies,
  getMoviesDetails,
  getsimilarMovies,
  getMovieURLs,
  filmId
};
