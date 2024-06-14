import {
  // API_KEY,
  API_URL_POPULAR,
  API_URL_SEARCH,
  API_URL_SIMILAR,
  // API_URL_MOVIE_INFO,
  getMovies,
  getsearchedMovies,
  // getMoviesDetails,
  getsimilarMovies,
  getMovieURLs,
  filmId
} from "./api";
import { closePopup } from "./modals";

const similarMovies = document.querySelector(".popup__similar");
const form = document.querySelector("form");
const searchMovie = form.querySelector(".header__search");
const movieUrls = document.querySelector(".popup__movie-url");


let filmId
console.log(filmId)

getMovies(API_URL_POPULAR);

// вешаем слушатель для поиска похожих фильмов

similarMovies.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".movies").innerHTML = "";
  closePopup(popupOpen);
  const apisimilarMovie = `${API_URL_SIMILAR}${filmId}${"/similars"}`;
  getsimilarMovies(apisimilarMovie);
});

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

// вешаем слушатель для поиска похожих фильмов

similarMovies.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".movies").innerHTML = "";
  closePopup(popupOpen);
  console.log("click");
  console.log(filmId);
  const apisimilarMovie = `${API_URL_SIMILAR}${filmId}${"/similars"}`;
  console.log(apisimilarMovie);
  getsimilarMovies(apisimilarMovie);
});

// вешаем слушатель на получение URLs выбранного фильма

movieUrls.addEventListener("click", (e) => {
  e.preventDefault();
  const apiMovieUrls = `${API_URL_URLS}${filmId}${"/external_sources?page=1"}`;
  getMovieURLs(apiMovieUrls);
});
