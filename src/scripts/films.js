const userTemplate = document.querySelector("#movie").content;
const insertMovies = document.querySelector(".movie");
const form = document.querySelector("form");
const searchMovie = form.querySelector(".header__search");
const stopScrolling = document.querySelector(".body");

const userTemplate1 = document.querySelector("#similarmovie").content;
const similarMovies = document.querySelector(".popup__similar");

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
    // const popupInfor = document.querySelector('.popup__movie-infor')
    // console.log(popupInfor);
    // const similarMovies = document.querySelector('.popup__similar');
  
    // console.log(similarMovies);
  
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
      // const movieUrl = `${API_URL_MOVIE_INFO}${data.kinopoiskId}`;
      // getMoviesDetails(movieUrl);
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

 // функция создания карточек на сайте из ответа API - похожие фильмы

function createsimilarCard(data) {
  const movieEl1 = userTemplate1.querySelector(".similarmovie").cloneNode(true);
  console.log(movieEl1);
  const image1 = movieEl1.querySelector(".similarmovie__cover");
  console.log(image1);

  const movieDetails = movieEl1.querySelector(".similarmovie__cover--darkened");
  const title = movieEl1.querySelector(".similarmovie__title");

  image1.src = data.posterUrlPreview;
  image1.alt = data.nameRu;
  title.textContent = data.nameRu;

  // вешаем слушатель для получения деталей о фильме

  movieDetails.addEventListener("click", function () {
    // if (data.kinopoiskId === undefined) {
    //   let movieUrl = `${API_URL_MOVIE_INFO}${data.filmId}`;
    //   getMoviesDetails(movieUrl);
    // } else {
    //   let movieUrl = `${API_URL_MOVIE_INFO}${data.kinopoiskId}`;
    //   getMoviesDetails(movieUrl);
    // }
    const movieUrl = `${API_URL_MOVIE_INFO}${data.filmId}`;
    getMoviesDetails(movieUrl);
  });
    return movieEl1;
}