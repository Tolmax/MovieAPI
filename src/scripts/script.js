// // import { generatePopup } from "./modals";

// const API_KEY = "99116293-2534-4b37-b131-ce5f5c970a85";
// const API_URL_POPULAR =
//   "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1";
// const API_URL_SEARCH =
//   "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
// const API_URL_SIMILAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
// const API_URL_MOVIE_INFO =
//   "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
// const API_URL_URLS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

// const userTemplate = document.querySelector("#movie").content;
// const insertMovies = document.querySelector(".movie");
// const form = document.querySelector("form");
// const searchMovie = form.querySelector(".header__search");
// const stopScrolling = document.querySelector(".body");

// const userTemplate1 = document.querySelector("#similarmovie").content;
// const similarMovies = document.querySelector(".popup__movie-similar");
// const movieUrls = document.querySelector(".popup__movie-url");

// const urlsTemplate = document.querySelector("#urls");

// getMovies(API_URL_POPULAR);

// //  запрос на получение топ 250 фильмов

// function getMovies(URL) {
//   fetch(URL, {
//     method: "GET",
//     headers: {
//       "X-API-KEY": "99116293-2534-4b37-b131-ce5f5c970a85",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((respData) => {
//       showMovies(respData);
//     })
//     .catch((error) => {
//       console.log("Ошибка при выполнении функции: " + error);
//     });
// }

// //  запрос для поиска фильма по словам

// function getsearchedMovies(URL) {
//   fetch(URL, {
//     method: "GET",
//     headers: {
//       "X-API-KEY": "99116293-2534-4b37-b131-ce5f5c970a85",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((respData) => {
//       console.log(respData);
//       showSearchMovies(respData);
//     })
//     .catch((error) => {
//       console.log("Ошибка при выполнении функции: " + error);
//     });
// }

// // вешаем слушатель для поиска фильма по словам

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   document.querySelector(".movies").innerHTML = "";
//   const apisearchMovie = `${API_URL_SEARCH}${searchMovie.value}`;
//   if (searchMovie.value) {
//     getsearchedMovies(apisearchMovie);
//     searchMovie.value = "";
//   }
// });

// //  запрос на получение данных фильма по ID

// let filmId;

// function getMoviesDetails(URL) {
//   fetch(URL, {
//     method: "GET",
//     headers: {
//       "X-API-KEY": "99116293-2534-4b37-b131-ce5f5c970a85",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((respData) => {
//       filmId = respData.kinopoiskId;
//       generatePopup(respData);
//       return filmId;
//     })
//     .catch((error) => {
//       console.log("Ошибка при выполнении функции: " + error);
//     });
// }

// //  запрос на получение похожих фильмов

// function getsimilarMovies(URL) {
//   fetch(URL, {
//     method: "GET",
//     headers: {
//       "X-API-KEY": "99116293-2534-4b37-b131-ce5f5c970a85",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((respData) => {
//       console.log(respData);
//       showsimilarMovies(respData);
//       closePopup(popupOpen);
//     })
//     .catch((error) => {
//       console.log("Ошибка при выполнении функции: " + error);
//     });
// }

// // вешаем слушатель для поиска похожих фильмов

// similarMovies.addEventListener("click", (e) => {
//   e.preventDefault();
//   document.querySelector(".movies").innerHTML = "";
//   closePopup(popupOpen);
//   const apisimilarMovie = `${API_URL_SIMILAR}${filmId}${"/similars"}`;
//   getsimilarMovies(apisimilarMovie);
// });

// //  запрос на получение URLs выбранного фильма

// function getMovieURLs(URL) {
//   fetch(URL, {
//     method: "GET",
//     headers: {
//       "X-API-KEY": "99116293-2534-4b37-b131-ce5f5c970a85",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((respData) => {
//       closePopup(popupOpen);
//       generatePopupUrl(respData);
//     })
//     .catch((error) => {
//       console.log("Ошибка при выполнении функции: " + error);
//     });
// }

// // вешаем слушатель на получение URLs выбранного фильма

// movieUrls.addEventListener("click", (e) => {
//   e.preventDefault();
//   const apiMovieUrls = `${API_URL_URLS}${filmId}${"/external_sources?page=1"}`;
//   getMovieURLs(apiMovieUrls);
// });

// // функция создания карточки на сайте из ответа API

// function createCard(data) {
//   const movieEl = userTemplate.querySelector(".movie").cloneNode(true);
//   const image = movieEl.querySelector(".movie__cover");
//   const movieDetails = movieEl.querySelector(".movie__cover--darkened");
//   const title = movieEl.querySelector(".movie__title");
//   const category = movieEl.querySelector(".movie__category");
//   const year = movieEl.querySelector(".movie__year");
//   const rating = movieEl.querySelector(".movie__rating");
//   const ratingColor = movieEl.querySelector(".movie__rating");
//   const infor = movieEl.querySelector(".movie__info");

//   if (data.ratingKinopoisk === undefined) {
//     const el = infor.querySelector(".movie__rating");
//     const parent = el.parentNode;
//     parent.removeChild(el);
//   }

//   getclassbyRate(data.ratingKinopoisk);

//   // вешаем слушатель для получения деталей о фильме

//   movieDetails.addEventListener("click", function () {
//     if (data.kinopoiskId === undefined) {
//       let movieUrl = `${API_URL_MOVIE_INFO}${data.filmId}`;
//       getMoviesDetails(movieUrl);
//     } else {
//       let movieUrl = `${API_URL_MOVIE_INFO}${data.kinopoiskId}`;
//       getMoviesDetails(movieUrl);
//     }
//   });

//   image.src = data.posterUrlPreview;
//   image.alt = data.nameRu;
//   title.textContent = data.nameRu;
//   category.textContent = data.genres.map((genre) => ` ${genre.genre}`);
//   year.textContent = data.year;
//   rating.textContent = data.ratingKinopoisk;
//   ratingColor.classList.add(`${getclassbyRate(data.ratingKinopoisk)}`);

//   return movieEl;
// }

// // функция создания карточек на сайте из ответа API - похожие фильмы

// function createsimilarCard(data) {
//   const movieEl1 = userTemplate1.querySelector(".similarmovie").cloneNode(true);
//   const image1 = movieEl1.querySelector(".similarmovie__cover");
//   const movieDetails = movieEl1.querySelector(".similarmovie__cover--darkened");
//   const title = movieEl1.querySelector(".similarmovie__title");

//   // вешаем слушатель для получения деталей о фильме

//   movieDetails.addEventListener("click", function () {
//     if (data.kinopoiskId === undefined) {
//       let movieUrl = `${API_URL_MOVIE_INFO}${data.filmId}`;
//       getMoviesDetails(movieUrl);
//     } else {
//       let movieUrl = `${API_URL_MOVIE_INFO}${data.kinopoiskId}`;
//       getMoviesDetails(movieUrl);
//     }
//   });

//   image1.src = data.posterUrlPreview;
//   image1.alt = data.nameRu;
//   title.textContent = data.nameRu;

//   return movieEl1;
// }

// function showMovies(data) {
//   data.items.forEach((movie) => {
//     const cardMovie = createCard(movie);
//     document.querySelector(".movies").appendChild(cardMovie);
//   });
// }

// function showSearchMovies(data) {
//   data.films.forEach((movie) => {
//     const cardMovie = createCard(movie);
//     document.querySelector(".movies").appendChild(cardMovie);
//   });
// }

// function showsimilarMovies(data) {
//   data.items.forEach((movie) => {
//     const similarMovie = createsimilarCard(movie);
//     document.querySelector(".movies").appendChild(similarMovie);
//   });
// }

// // функция цвета границы кружка в зависимости от рейтинга

// function getclassbyRate(vote) {
//   if (vote > 7) {
//     return "movie__rating_green";
//   } else if (vote > 5) {
//     return "movie__rating_orange";
//   } else {
//     return "movie__rating_red";
//   }
// }

// //  Модальнле окно 1

// const popupOpen = document.querySelector(".popup__type-movie-details");
// const popupImage = popupOpen.querySelector(".popup__image");
// const popupTitle = popupOpen.querySelector(".popup__title");
// const popupYear = popupOpen.querySelector(".popup__release-year");
// const popupGaner = popupOpen.querySelector(".popup__ganer");
// const popupRuntime = popupOpen.querySelector(".popup__runtime");
// const popupUrl = popupOpen.querySelector(".popup__url");
// const popupDescrip = popupOpen.querySelector(".popup__description");
// const popupClose = popupOpen.querySelector(".popup__close");

// function openPopup(popup) {
//   popup.classList.add("popup_is-opened");
//   document.addEventListener("keydown", (evt) => {
//     if (evt.key === "Escape") {
//       closePopup(popup);
//     }
//   });
//   popupClose.addEventListener("click", function () {
//     closePopup(popup);
//   });
//   popupClose2.addEventListener("click", function () {
//     closePopup(popup);
//   });
//   window.addEventListener("click", function (e) {
//     if (e.target === popup) {
//       closePopup(popup);
//     }
//   });
// }

// function closePopup(popup) {
//   popup.classList.remove("popup_is-opened");
//   stopScrolling.classList.remove("stop-scrolling");
// }


// function generatePopup(data) {
//   popupImage.src = data.posterUrlPreview;
//   popupImage.alt = data.nameRu;
//   popupTitle.textContent = `"${data.nameRu}"    `;
//   popupYear.textContent = data.year;
//   popupGaner.textContent = `Жанр: ${data.genres.map(
//     (genre) => ` ${genre.genre}`
//   )}`;
//   popupRuntime.textContent = `Продолжительность: ${data.filmLength} минут`;
//   popupUrl.href = `${data.webUrl}`;
//   popupUrl.textContent = `${data.webUrl}`;
//   popupDescrip.textContent = `Описание: ${data.description}`;
//   stopScrolling.classList.add("stop-scrolling");
//   openPopup(popupOpen);
// }

// //  Модальнле окно 2

// const popupOpenURL = document.querySelector(".popup__type-urls");
// const popupPlatform = popupOpenURL.querySelector(".popup__platform");
// const popupMovieUrl = popupOpenURL.querySelector(".popup__movieurl");
// const popupClose2 = popupOpenURL.querySelector(".popup__close");
// const popupMovieUrlsNode = document.querySelector('.popup__movieurls');

// function generatePopupUrl(data) {
//   renderPopupUrlContent(data);
//   stopScrolling.classList.add("stop-scrolling");
//   openPopup(popupOpenURL);
// }

// function renderPopupUrlContent(data) {
//   const films = data.items;

//   popupMovieUrlsNode.textContent = '';
//   for (i = 0; i < films.length; i++) {
//     const { logoUrl, platform, url } = films[i];
//     popupMovieUrlsNode.innerHTML += `
//       <div class="popup__movieurls-item">
//         <img class="popup__movieurls-item-img" src="${logoUrl}">
//         <a class="popup__movieurls-item-url" target="_blank" href="${url}">${platform}</a> 
//       </div>
//     `;

//     // const popupMovieUrlsItemNode = createPopupMovieUrlsItemNode(films[i]);
//     // popupMovieUrlsNode.append(popupMovieUrlsItemNode);
//   }
// }

// function createPopupMovieUrlsItemNode({ logoUrl, platform, url }) {
//   const divNode = document.createElement('div');

//   divNode.classList.add('popup__movieurls-item')
//   divNode.innerHTML = `
//     <img class="popup__movieurls-item-img" src="${logoUrl}">
//     <a class="popup__movieurls-item-url" target="_blank" href="${url}">${platform}</a> 
//   `;

//   return divNode;
// }
