
const API_KEY = "99116293-2534-4b37-b131-ce5f5c970a85";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1"
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="

getMovies(API_URL_POPULAR)

document.querySelector('.movies').innerHTML = '';

async function getMovies(URL) {
  try {
  const resp = await fetch(URL, {
    method: 'GET',
    headers: {
      'X-API-KEY': '99116293-2534-4b37-b131-ce5f5c970a85',
      'Content-Type': 'application/json',      
    },
  });  
  const respData = await resp.json();
  console.log(respData)
  showMovies(respData);
  } catch (error) {
    console.log("Ошибка при выполнении функции: " + error);
  }
}

function getclassbyRate(vote) {
  if (vote > 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}
function showMovies(data) {
  const moviesEl = document.querySelector('.movies');

    data.items.forEach((movie) => {
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `
      <div class="movie__cover-inner">
      <img src="${movie.posterUrlPreview}"
          class="movie_cover" Alt="${movie.nameRu}"/>
      <div class="movie__cover--darkened"></div>
  </div>
  <div class="movie__info">
      <div class="movie__title">${movie.nameRu}</div>
      <div class="movie__category">${movie.genres.map((genre) => ` ${genre.genre}`)}</div>
      <div class="movie__year">${movie.year}</div>
      <div class="movie__rating movie__rating--${getclassbyRate(movie.ratingKinopoisk)}">${movie.ratingKinopoisk}</div>
  </div>      
      `;
      moviesEl.appendChild(movieEl);
    });
}

const form = document.querySelector('form');
const search = form.querySelector('.header__search');


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const apisearchUrl = `${API_URL_SEARCH}${search.value}`;
  console.log(apisearchUrl)
  if (search.value) {
    
  getsearchMovies(apisearchUrl);
  search.value = '';
  }
})

async function getsearchMovies(URL) {
  try {
  const resp = await fetch(URL, {
    method: 'GET',
    headers: {
      'X-API-KEY': '99116293-2534-4b37-b131-ce5f5c970a85',
      'Content-Type': 'application/json',      
    },
  });  
  const respData = await resp.json();
  console.log(respData)
  showSearchMovies(respData);
  } catch (error) {
    console.log("Ошибка при выполнении функции: " + error);
  }
}

function getclassbyRate(vote) {
  if (vote > 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}
function showSearchMovies(data) {
  const moviesEl = document.querySelector('.movies');
  document.querySelector('.movies').innerHTML = '';

    data.films.forEach((movie) => {
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `
      <div class="movie__cover-inner">
      <img src="${movie.posterUrlPreview}"
          class="movie_cover" Alt="${movie.nameRu}"/>
      <div class="movie__cover--darkened"></div>
  </div>
  <div class="movie__info">
      <div class="movie__title">${movie.nameRu}</div>
      <div class="movie__category">${movie.genres.map((genre) => ` ${genre.genre}`)}</div>
      <div class="movie__year">${movie.year}</div>
      <div class="movie__rating movie__rating--${getclassbyRate(movie.rating)}">${movie.rating}</div>
  </div>      
      `;
      moviesEl.appendChild(movieEl);
    });
}
