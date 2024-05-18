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

form.addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector('.movies').innerHTML = '';
    const apisearchMovie = `${API_URL_SEARCH}${searchMovie.value}`
    console.log(apisearchMovie)
    if (searchMovie.value) {
        getsearchedMovies(apisearchMovie);
        searchMovie.value = ''
    }
})


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

function createCard(data) {
  const movieEl = userTemplate.querySelector(".movie").cloneNode(true);
  const image = movieEl.querySelector(".movie_cover");
  const title = movieEl.querySelector(".movie__title");
  const category = movieEl.querySelector(".movie__category");
  const year = movieEl.querySelector(".movie__year");
  const rating = movieEl.querySelector(".movie__rating");
  const ratingColor = movieEl.querySelector(".movie__rating");

  getclassbyRate(data.ratingKinopoisk);

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

function getclassbyRate(vote) {
  if (vote > 7) {
    return "movie__rating--green";
  } else if (vote > 5) {
    return "movie__rating--orange";
  } else {
    return "movie__rating--red";
  }
}
